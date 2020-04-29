const fetch = require('node-fetch');
const FormData = require('form-data');
const moment = require('moment');
moment.locale('vi');

function Facebook(accessToken, groupId)
{
    const facebookApiV6 = 'https://graph.facebook.com/v6.0';
    let urlCreateImage = `${facebookApiV6}/${groupId}/photos`;

    this.postAsPage = (pageId) => {
        urlCreateImage = `${facebookApiV6}/${pageId}/photos`;

        return this;
    };

    const publishImage = async (image, isUrl = false) => {
        //using await for prevent anti spam facebook. In fact, it's may run faster
        let formData = new FormData();
        formData.append('access_token', accessToken);
        formData.append('published', 'false');
        
        if (!isUrl) {
            let randomInt = Math.floor(Math.random() * Math.floor(1000));
            formData.append("source", image, {
                filename: randomInt + '-img.png',
                contentType: 'image/png',
            });
        } else {
            formData.append('url', image);
        }

        let response = await fetch(urlCreateImage, {
            method: 'POST',
            body: formData,
        });

        response = await response.json();

        console.log(response);
        return response.id;
    };

    this.postNewsSang = async(images) => {
        let formPublish = new FormData();
        let date = moment().format('LL').toUpperCase();
        formPublish.append('message',
            `ĐIỂM TIN SÁNG - ${date}\n` +
            '________________________________________\n' +
            '* Nguồn tin: Báo điện tử VnExpress\n' +
            '* Bài viết được đăng tự động lúc 6 giờ hàng ngày\n');
        formPublish.append('formatting', 'MARKDOWN');

        for (let i = 0; i < images.length ; i++) {
            let responseId = await publishImage(images[i]);
            formPublish.append(`attached_media[${i}]`, `{"media_fbid":"${responseId}"}`);
        }
        // let lastImageId = await publishImage('https://source.unsplash.com/daily?girl', true);
        // formPublish.append(`attached_media[${images.length}]`, `{"media_fbid":"${lastImageId}"}`);

        let response = await fetch(`${facebookApiV6}/${groupId}/feed?access_token=`+accessToken, {
            method: 'POST',
            body: formPublish,
        });
        console.log(await response.json())
    };
    
    this.postNewsTrua = async(images) => {
        let formPublish = new FormData();
        let date = moment().format('LL').toUpperCase();
        formPublish.append('message',
            `ĐIỂM TIN TRƯA - ${date}\n` +
            '________________________________________\n' +
            '* Nguồn tin: Báo điện tử VnExpress\n' +
            '* Bài viết được đăng tự động lúc 12 giờ trưa hàng ngày\n');
        formPublish.append('formatting', 'MARKDOWN');

        for (let i = 0; i < images.length ; i++) {
            let responseId = await publishImage(images[i]);
            formPublish.append(`attached_media[${i}]`, `{"media_fbid":"${responseId}"}`);
        }
        // let lastImageId = await publishImage('https://source.unsplash.com/daily?girl', true);
        // formPublish.append(`attached_media[${images.length}]`, `{"media_fbid":"${lastImageId}"}`);

        let response = await fetch(`${facebookApiV6}/${groupId}/feed?access_token=`+accessToken, {
            method: 'POST',
            body: formPublish,
        });    
        console.log(await response.json())
    };
        
    this.postNewsToi = async(images) => {
        let formPublish = new FormData();
        let date = moment().format('LL').toUpperCase();
        formPublish.append('message',
            `ĐIỂM TIN CUỐI NGÀY - ${date}\n` +
            '________________________________________\n' +
            '* Nguồn tin: Báo điện tử VnExpress\n' +
            '* Bài viết được đăng tự động lúc 22 giờ hàng ngày\n');
        formPublish.append('formatting', 'MARKDOWN');

        for (let i = 0; i < images.length ; i++) {
            let responseId = await publishImage(images[i]);
            formPublish.append(`attached_media[${i}]`, `{"media_fbid":"${responseId}"}`);
        }
        // let lastImageId = await publishImage('https://source.unsplash.com/daily?girl', true);
        // formPublish.append(`attached_media[${images.length}]`, `{"media_fbid":"${lastImageId}"}`);

        let response = await fetch(`${facebookApiV6}/${groupId}/feed?access_token=`+accessToken, {
            method: 'POST',
            body: formPublish,
        });        
        console.log(await response.json())
    };
}

module.exports = Facebook;
