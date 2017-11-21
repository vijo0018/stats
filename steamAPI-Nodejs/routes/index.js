var express = require('express');
var router = express.Router();
var axios = require('axios');
var app     = express();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
var key = '5B153DDA2031EA993DF59D635D909D3A';
var id = '76561198034828008';
router.get('/cs', function (req, res, next) {

    //http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=5B153DDA2031EA993DF59D635D909D3A&steamid=76561198034828008
    axios.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key='+key+'&steamid='+id+'')
        .then(function (response) {

            // cs data kommer här
            console.log(response.data);

            res.status(200).json({
                message: 'Success',
                csData: response.data
            });
        })
        .catch(function (error) {
            console.log(error);

            return res.status(500).json({
              title:'An error occured',
                error:error
            });
        })
});
    router.get('/news', function (req, res, next) {
axios.get('http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=730&count=3&maxlength=300&format=json')
    .then(function (response) {

        // cs data kommer här
        console.log(response.data);

        res.status(200).json({
            message: 'Success',
            csNews: response.data
        });
    })
    .catch(function (error) {
        console.log(error);

        return res.status(500).json({
            title:'An error occured',
            error:error
        });
    })
});
var reddit = 'https://www.reddit.com';
router.get('/scrape', function(req, res, next) {
    request('https://www.reddit.com/r/GlobalOffensive/', function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var urls = [];
            var urlTitle = [];
            var imgs = [];

            $('a.title', '#siteTable').each(function () {
                var titletext = $(this).text();
                var url = $(this).attr('href');
                if(url.match('/r/')) {
                    urls.push(reddit+url);
                    (imgs).push('https://lh3.googleusercontent.com/J41hsV2swVteoeB8pDhqbQR3H83NrEBFv2q_kYdq1xp9vsI1Gz9A9pzjcwX_JrZpPGsa=w300');
                }
                if(!url.match('/r/')){
                    urls.push(url);
                    (imgs).push('https://bubble-at4vegnhqpi2zkmsnjd.stackpathdns.com/img/ctandt.png');
                }

                urlTitle.push(titletext);

            });

            JSON.stringify(urls);
            JSON.stringify(imgs);

            console.log(urls);
            res.status(200).json({
                message: 'Success',
                csDataNews: urls,
                urlTitleText: urlTitle,
                img: imgs
            });
        }
    });
});

var hltv = 'http://www.hltv.org';
router.get('/hltvScrape', function(req, res, next) {
    request('http://www.hltv.org', function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var urls = [];
            var urlTitle = [];
            var imgs = [];
            var uploaded = [];

            $('a', '.standard-box.standard-list').each(function () {
                var url = $(this).attr('href');
                if(url.match('/news/')) {
                    urls.push(hltv+url);
                }
            });

            $('div.newstext', '.newsline').each(function () {
                var titletext = $(this).text();
                urlTitle.push(titletext);
            });
            $('div.newsrecent', '.newsline').each(function () {
                var newsrecent = $(this).text();
                uploaded.push(newsrecent);
            });




            $('img', '.newsline').each(function () {
                var img = $(this).attr('src');

                    imgs.push(img);
            });

            JSON.stringify(urls);
            JSON.stringify(imgs);

            console.log(urls);
            res.status(200).json({
                message: 'Success',
                linkData: urls,
                titleText: urlTitle,
                images: imgs,
                newsRecent: uploaded
            });
        }
    });
});



router.get('/ImageScrape', function(req, res, next) {
    request('https://steamcommunity.com/app/730/images/', function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var images = [];

            $('img', '.apphub_CardContentMain').each(function () {
                var img = $(this).attr('src');﻿
                images.push(img)
            });

            JSON.stringify(images);

            console.log(images);
            res.status(200).json({
                message: 'Success',
                csgoArt: images
            });
        }
    });
});

router.get('/RecentArtScrape', function(req, res, next) {
    request('https://steamcommunity.com/app/730/images/all?p=1&browsefilter=mostrecent', function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var RecentImages = [];

            $('img', '.apphub_CardContentMain').each(function () {
                var img = $(this).attr('src');﻿
                RecentImages.push(img)
            });

            JSON.stringify(RecentImages);

            console.log(RecentImages);
            res.status(200).json({
                message: 'Success',
                recentArt: RecentImages
            });
        }
    });
});

router.get('/TopArtScrape', function(req, res, next) {
    request('https://steamcommunity.com/app/730/images/?p=1&browsefilter=toprated', function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var TopImages = [];

            $('img', '.apphub_CardContentMain').each(function () {
                var img = $(this).attr('src');﻿
                TopImages.push(img)
            });

            JSON.stringify(TopImages);

            console.log(TopImages);
            res.status(200).json({
                message: 'Success',
                TopArt: TopImages
            });
        }
    });
});

router.get('/events', function (req, res, next) {
    axios.get('http://decoreapp.azurewebsites.net/api/events')
        .then(function (response) {

            // event kommer här
            console.log(response.data);

            res.status(200).json({
                message: 'Success',
                events: response.data
            });
        })
        .catch(function (error) {
            console.log(error);

            return res.status(500).json({
                title:'An error occured',
                error:error
            });
        })
});

router.get('/playerSum', function (req, res, next) {
    axios.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+key+'&steamid='+id+'')
        .then(function (response) {

            // cs data kommer här //last logged in osv.
            console.log(response.data);

            res.status(200).json({
                message: 'Success',
                playerSum: response.data
            });
        })
        .catch(function (error) {
            console.log(error);

            return res.status(500).json({
                title:'An error occured',
                error:error
            });
        })
});


router.get('/achieve', function (req, res, next) {
    axios.get('http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key='+key+'&appid=730')
        .then(function (response) {

            // cs data komsmer här api for achieivements med bild.
            console.log(response.data);

            res.status(200).json({
                message: 'Success',
                achieveImg: response.data
            });
        })
        .catch(function (error) {
            console.log(error);

            return res.status(500).json({
                title:'An error occured',
                error:error
            });
        })
});

router.get('/playerStatus', function (req, res, next) {
    axios.get('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key='+key+'&steamids='+id+'')
        .then(function (response) {

            // cs data kommer här//player bans api
            console.log(response.data);

            res.status(200).json({
                message: 'Success',
                csNews: response.data
            });
        })
        .catch(function (error) {
            console.log(error);

            return res.status(500).json({
                title:'An error occured',
                error:error
            });
        })
});

module.exports = router;