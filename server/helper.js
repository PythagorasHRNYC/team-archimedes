/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// getTweets() does the work of querying the twitter API and then
// executes the callback function from index.js with the results.
//
// We used the oauth npm module to handle authorization with the twitter api.
// oauth module docs: https://www.npmjs.com/package/oauth
// twitter api docs: https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request
//
// cronJob() does the work of grabbing all searchTerms out of the database and then calling getTweets() on 
// each searchTerm, in order to get a richer data set over time.
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var OAuth = require ('oauth');
var key = require ('../config/twitter.js');
var sentiment = require('sentiment');
var db = require('../database/index.js');

cronJob = () => {
	console.log('cronJob!');
	
	db.getAllTermData((res) => {
	// step one - get all search terms
    res.forEach((term) => {
      term = term || 'flock';
    // iterate over all search terms
      getTweets(term, (data) => {
      	// get new tweets for each term
        console.log("Successful CronJob")
        var neg = [];

        data.forEach((tweet) => {
        	// iterate through all tweets for that term, and calculate average sentiment
          var score = sentiment(tweet.tweetBody).score;
          if (score < 0 ) {
            neg.push(tweet);
          }
        });

        var average = (neg.length/data.length) * 100
        // save new data to database of se
        db.save({
          searchTerm: term.searchTerm,
          averageScore: average,
          searchHour: Date.now()
        });

      });
    });
  });
	
	
}



getTweets = (st, cb) => {
	console.log(st)
	var oauth = new OAuth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		key.CONSUMER_KEY,
		key.CONSUMER_SECRET,
		'1.0A',
		null,
		'HMAC-SHA1'
	);

	oauth.get(`https://api.twitter.com/1.1/search/tweets.json?q=${st}&count=100&tweet_mode=extended`, key.ACCESS_TOKEN, key.ACCESS_TOKEN_SECRET, function(e, data, res) {
		if (e) { 
			console.error(e);
			cb([]);
		} else {
			let temp = JSON.parse(data).statuses
			let cleaned = []
			console.log('ST IS ', st)

			temp.map((tweet) => {
				var selectedData = {
					// score: sentiment(tweet).score,
					searchTerm: st,
					timeStamp: tweet.created_at,
					// if tweet has been retweeted, its full text lives in the retweeted_status object
					tweetBody: tweet.retweeted_status ? tweet.retweeted_status.full_text : tweet.full_text,
					user_name: tweet.user.screen_name,
					user_location: tweet.user.location,
					avatar_url: tweet.user.profile_image_url
				}

				cleaned.push(selectedData)
			});

		cb(cleaned);

		}
		});
}

getUserProfileData = (userScreenName, cb) => {
	var oauth = new OAuth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		key.CONSUMER_KEY,
		key.CONSUMER_SECRET,
		'1.0A',
		null,
		'HMAC-SHA1'
	);


	oauth.get(`https://api.twitter.com/1.1/users/show.json?screen_name=${userScreenName}&include_entities=false`, key.ACCESS_TOKEN, key.ACCESS_TOKEN_SECRET, function(e, data, res) {
		if (e) { 
			console.error(e);
			cb([]);
		} else {


			let userObject = JSON.parse(data)

			//sorting callback function
			const mostPopularUser = (user_a, user_b) => {
				if(user_a.followers_count < user_b.followers_count) {
					return -1
				} else if(user_a.followers_count > user_b.followers_count) {
					return 1
				} else {
					return 0
				}
			}

			const adjustProfileImageSize = (imageUrl, size) => {
				return imageUrl.split('').reverse().join('').replace(/[a-z\.]*_/, '').split('').reverse().join('') + `_${size}x${size}.jpg`
			}

			//picking object belows keys off object above
			let { 
				name: name,
				screen_name: screen_name,
				description: description,
				location: location,
				protected: protected,
				followers_count: followers_count,
				friends_count: friends_count,
				created_at: created_at,
				favourites_count: favourites_count,
				verified: verified,
				statuses_count: statuses_count,
				profile_image_url_https: profile_image_url_https,
				profile_banner_url: profile_banner_url,
			} = userObject;

			oauth.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${userScreenName}&count=20&tweet_mode=extended&trim_user=true&exclude_replies=true&include_rts=true`, key.ACCESS_TOKEN, key.ACCESS_TOKEN_SECRET, function(e, data, res) {
				if (e) { 
					console.error(e);
					cb([]);
				} else {
					let statuses = JSON.parse(data)
					
					let userStatuses;

					userStatuses=statuses.map((tweet) => {
						var status = {
							// score: sentiment(tweet).score,
							timeStamp: tweet.created_at,
							// if tweet has been retweeted, its full text lives in the retweeted_status object
							tweetBody: tweet.retweeted_status ? tweet.retweeted_status.full_text : tweet.full_text,
							retweet_count: tweet.retweet_count,
							favorite_count: tweet.retweeted_status ? tweet.retweeted_status.favorite_count : tweet.favorite_count
						}
						return status
					})
	

					oauth.get(`https://api.twitter.com/1.1/followers/list.json?screen_name=${userScreenName}&skip_status=true&include_user_entities=false&count=100`, key.ACCESS_TOKEN, key.ACCESS_TOKEN_SECRET, function(e, data, res) {
						if (e) { 
							console.error(e);
							cb([]);
						} else {
							let followers = JSON.parse(data).users

							let usersFollowers;

							usersFollowers=followers.map((followerInfo) => {

								({ 
									name,
									screen_name,
									description,
									location,
									protected,
									followers_count,
									friends_count,
									created_at,
									favourites_count,
									verified,
									statuses_count,
									profile_image_url_https,
									profile_banner_url 
								} = followerInfo);

								let follower = { 
									name,
									screen_name,
									description,
									location,
									protected,
									followers_count,
									friends_count,
									created_at,
									favourites_count,
									verified,
									statuses_count,
									profile_image_url_https,
									profile_banner_url 
								}
								follower.profile_image_url_https = adjustProfileImageSize(profile_image_url_https, 400)
								return follower
							}).sort(mostPopularUser)

							oauth.get(`https://api.twitter.com/1.1/friends/list.json?screen_name=${userScreenName}&skip_status=true&include_user_entities=false`, key.ACCESS_TOKEN, key.ACCESS_TOKEN_SECRET, function(e, data, res) {
								if (e) { 
									console.error(e);
									cb([]);
								} else {
									let friends = JSON.parse(data).users
	
									let usersFriends;

									usersFriends=friends.map((userFriend) => {
										({ 
											name,
											screen_name,
											description,
											location,
											protected,
											followers_count,
											friends_count,
											created_at,
											favourites_count,
											verified,
											statuses_count,
											profile_image_url_https,
											profile_banner_url 
										} = userFriend)
										
										let friend = { 
											name,
											screen_name,
											description,
											location,
											protected,
											followers_count,
											friends_count,
											created_at,
											favourites_count,
											verified,
											statuses_count,
											profile_image_url_https,
											profile_banner_url 
										};
										friend.profile_image_url_https = adjustProfileImageSize(profile_image_url_https, 400)
										return friend
									}).sort(mostPopularUser)

									let UserDataObject = { 
										name: name,
										screen_name: screen_name,
										description: description,
										location: location,
										protected: protected,
										followers_count: followers_count,
										friends_count: friends_count,
										created_at: created_at,
										favourites_count: favourites_count,
										verified: verified,
										statuses_count: statuses_count,
										profile_image_url_https: adjustProfileImageSize(profile_image_url_https, 400),
										profile_banner_url: profile_banner_url,
										usersFollowers,
										usersFriends,
										userStatuses
									}

									cb( UserDataObject )
								}
							});
						}
					});
				}
			});
		}
	});
}


module.exports.getUserProfileData = getUserProfileData;
module.exports.getTweets = getTweets;
module.exports.cronJob = cronJob;

