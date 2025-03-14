const mongoose=require('mongoose');
const Model=require('./models/Project');

const product=[
    {
        name:"nike shoes",
        img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
        price:1050,
        desc:"cool shoes"

    },
    {
        name:"iphone 12",
        img:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTPBTD5jl3u_S0RNp4iUIZesI5lNw7t7o8YvndZKGTov_8Glbs6OczcCl1l32snQBr_eektpZU4xkaKZWkYb7Vc2iSbw40wDCXvteti8hUTiaTaqMEHjHZjvVGi",
        price:135000 ,
        desc:"bhadiya"
    },
    {
        name:"iphone 13",
        img:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ3ANPNwVWiOsGPsesVQHQkeVnFPf-0QjV5Jzs4fLt_8tAgzYOSvJPlH5SAU5l-qO_yROlVjWSZ1t0X6BCK_fOEvv2cbWC8C2a4EDF6vJEs",
        price: 140000 ,
        desc:"mje lo"
    },
    {
        name:"iphone 14",
        img:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSSORtLxpxygx3JR3UmJbxcx3hnWtz5B75DMruouNB8Q23ye3SKhHGyU-aiIQNDoU3r0ahEbu4pGrHyBHtYgsPAlBZ96mF2xSzyMENcmmo",
        price:150000 ,
        desc:"chirag ki maro phone lelo"
    }
]


async function seedDB(){
    await Model.insertMany(product);
    console.log("data seeded successfully ");//seed file bnai he kyoki dummy data to dikhana he website 
}

module.exports=seedDB;