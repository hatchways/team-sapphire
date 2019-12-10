const generateEmailBody = responses => {
  const individualResponse = () => {
    let string = "";
    for (let response of responses) {
      string += `<div style="z-index: 4;
    width: 560px;
    height: 140px;
    border-radius: 5px;
    box-shadow: 0px 0px20px rgba(215,219,237,0.3);
    margin: auto;
    margin-bottom: 10px;
    "
    >
    <img
    src=${response.image}
    alt="AHHHHHHHH"
    style="z-index: 5;
    width: 120px;
    height: 140px;
    background: #d8d8d8;
    float: left
    "
    >
    <div style="width: 440px;
    margin: auto;
    float: right;
    "
    >
    <div style="z-index: 4;
    height: 17px;
    font-family: Verdana;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    margin-left: 22px;
    word-wrap: break-word;
    "
    >
    ${response.title}
    </div>
    <div style="opacity: 0.298111;
    z-index: 4;
    height: 15px;
    font-family: Verdana;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    margin-left: 22px;
    margin-top: 7.5px;
    margin-bottom: 6.5px;
    "
    >
    ${response.platform}
    </div>
    <div style="opacity: 0.4972331;
    z-index: 4;
    height: 69px;
    font-family: Verdana;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    margin-left: 22px;
    word-wrap: break-word;
    "
    >
    ${response.content}
    </div>
    </div>
    </div>`;
    }

    return string;
  };

  return (
    `<!DOCTYPE html>
  <html lang="en">
  <head>
  <title>Weekly Report</title>
  </head>
  <body>
  <div style="width: 560px;
  height: 150px;
  margin: auto;
  margin-top: 30px;
  background: linear-gradient(-45deg, #4872D8, #6583F2);
  z-index: 4;
  "
  >
  <span style="z-index: 4;
  width: 205.9px;
  height: 40px;
  color: #ffffff;
  font-family: GothamPro-Bold;
  font-size: 30px;
  font-weight: 400;
  line-height: 40px;
  text-transform: uppercase;
  letter-spacing: -1.25px;
  margin: auto;
  margin-left: 10%;
  line-height: 150px;
  "
  >
  Weekly Report
  </span>
  <span style="z-index: 5;
  opacity: 0.099071;
  width: 100px;
  height: 100px;
  font-size: 100px;
  color: #ffffff;
  margin: auto;
  margin-right: 10%;
  line-height: 150px;
  float: right
  "
  >
  @
  </span>
  </div>
  <div>
  <div style="width: 560px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  "
  >
  <span style="z-index: 4;
  width: 365px;
  height: 22px;
  font-family: Verdana;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  "
  >
  Your mentions for this week:
  </span>
  </div>
  <div>` +
    individualResponse() +
    `
  </div>
  <div style="z-index: 4;
  width: 124px;
  height: 34px;
  margin: auto;
  margin-bottom: 40px;
  "
  >
  <button style="z-index: 4;
  width: 170px;
  height: 56px;
  background: #6583f2;
  border-radius: 50px;
  box-shadow: 0px 0px30px #476bf0;
  "
  >
  <span style="z-index: 4;
  width: 78.83px;
  height: 17px;
  color: #ffffff;
  font-family: GothamPro-Bold;
  font-size: 13px;
  font-weight: 400;
  line-height: 17px;
  text-align: center;
  text-transform: uppercase;
  "
  >
  Check More
  </span>
  </button> 
  </div>
  </div>
  </body>
  </html>
  `
  );
};
module.exports = { generateEmailBody };

// let responsesss = [ { _id: 5defe92ad5f45067a3da2bc7,
//   company: 'pokemon',
//   platform: 'Reddit',
//   postId: 'e8up3a',
//   userId: 't2_kuaiy',
//   content: '',
//   date: 'Tue Dec 10 2019 13:41:43 GMT-0500 (Eastern Standard Time)',
//   link:
//    'https://www.reddit.com/r/pokemon/comments/e8up3a/i_have_now_tried_to_faithfully_recreate_celestic/',
//   image:
//    'https://b.thumbs.redditmedia.com/MVwzQYOya_wUhuLtO1U0AOsDlru221-ANWxzfS2odCI.jpg',
//   popularity: 24,
//   title:
//    'I have now tried to faithfully recreate Celestic Town in the style of Red and Blue',
//   __v: 0 },
// { _id: 5defe92ad5f45067a3da2bd1,
//   company: 'pokemon',
//   platform: 'Reddit',
//   postId: 'e8umkn',
//   userId: 't2_4rostcmm',
//   content: '',
//   date: 'Tue Dec 10 2019 13:36:39 GMT-0500 (Eastern Standard Time)',
//   link:
//    'https://www.reddit.com/r/memes/comments/e8umkn/6_pokemon_aint_enough/',
//   image:
//    'https://b.thumbs.redditmedia.com/NHBMwNfIDHPsHpSigTnXuAUX69BORxmN4VNvEXDz1hw.jpg',
//   popularity: 20,
//   title: '6 Pokemon ain\'t enough',
//   __v: 0 },
// { _id: 5defe92ad5f45067a3da2bd2,
//   company: 'pokemon',
//   platform: 'Reddit',
//   postId: 'e8ulrp',
//   userId: 't2_132jat',
//   content: '',
//   date: 'Tue Dec 10 2019 13:35:05 GMT-0500 (Eastern Standard Time)',
//   link:
//    'https://www.reddit.com/r/pokemon/comments/e8ulrp/redesigned_primarina/',
//   image:
//    'https://b.thumbs.redditmedia.com/Ri6M7GppcaPG3KOes8QqDPqa4cvD0UkKAeUchPNXn2A.jpg',
//   popularity: 15,
//   title: 'Redesigned Primarina',
//   __v: 0 },
// { _id: 5defe92ad5f45067a3da2bcf,
//   company: 'pokemon',
//   platform: 'Reddit',
//   postId: 'e8un7u',
//   userId: 't2_4g574udv',
//   content: '',
//   date: 'Tue Dec 10 2019 13:37:54 GMT-0500 (Eastern Standard Time)',
//   link:
//    'https://www.reddit.com/r/pokemon/comments/e8un7u/marnie_best_girl_in_pokemon/',
//   image:
//    'https://b.thumbs.redditmedia.com/6HiQcJQupaF2Ko4Msna7DT1E3nSjpG9-gjCFvtIg-FY.jpg',
//   popularity: 13,
//   title: 'Marnie best girl in Pokemon',
//   __v: 0 } ]
