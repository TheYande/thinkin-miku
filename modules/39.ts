import cron from "node-cron"
import { client, defineChatCommand } from "strife.js";
import { data } from "./itCouldBeADatabase.js";

const mikuLinks = [
    "https://guides.brit.co/media-library/reference-http-www-zerochan-net-chibi-miku-san.jpg?id=24014010&width=800&quality=85",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/61ed27ee-1b3a-4a38-b9a4-d2d72757fc83/d2lsxe8-f704f619-9c36-4832-9fd5-12176b43bd74.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYxZWQyN2VlLTFiM2EtNGEzOC1iOWE0LWQyZDcyNzU3ZmM4M1wvZDJsc3hlOC1mNzA0ZjYxOS05YzM2LTQ4MzItOWZkNS0xMjE3NmI0M2JkNzQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GGdRC5yYUnx2xpv_ijY-yAj2ZJYH0fNh1N67zEbiKkY",
    "https://preview.redd.it/chibi-miku-headpats-v0-8z3uwxc88gyc1.jpeg?width=640&crop=smart&auto=webp&s=99774e23c41c4de28fdc2107d5e117da6150fd30",
    "https://pbs.twimg.com/media/FjxOPxCakAAGs7j?format=jpg&name=4096x4096",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3a2a0927-7e3a-4ddc-92c7-52a9f898005f/d55xcjn-0bca6e13-426f-4bb1-8d2b-d745694f55c7.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNhMmEwOTI3LTdlM2EtNGRkYy05MmM3LTUyYTlmODk4MDA1ZlwvZDU1eGNqbi0wYmNhNmUxMy00MjZmLTRiYjEtOGQyYi1kNzQ1Njk0ZjU1YzcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xWvVvUmsOHf4SB5ceMcWjEbJUJ0-xSNlZbL5rR0d298",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4379ea94-c866-4f3a-a5e6-34b4d116f2d8/d9td8pd-d8ccea13-3e1a-4aaa-ab23-5177da12b412.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQzNzllYTk0LWM4NjYtNGYzYS1hNWU2LTM0YjRkMTE2ZjJkOFwvZDl0ZDhwZC1kOGNjZWExMy0zZTFhLTRhYWEtYWIyMy01MTc3ZGExMmI0MTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wmyJp9A-kOQJGnmkgxH8uGlSnEBjCEUFO9Gw8_Zee88",
    "https://img.freepik.com/premium-photo/kawaii-chibi-anime-girl-stickers-cute-simple-minimal-delights-print-demand-pod-creative_655090-286956.jpg",
    "https://image.cdn2.seaart.ai/2024-03-21/cnu49ite878c738bl1ag/53520fefd7098eabc66f6746bb13f4ecd2ba8b72_high.webp",
    "https://i.pinimg.com/originals/b2/0d/ef/b20def553b7e2eaea3f2ee1dadb8fd4e.jpg",
    "https://i.pinimg.com/736x/ce/da/54/ceda5429c3ff590f3cd3ab340ac79017.jpg",
    "https://i.pinimg.com/1200x/e7/e2/7d/e7e27de6884ac38621bc9db91afd6fb1.jpg",
    "https://i.pinimg.com/236x/17/4f/d4/174fd45e3472c09df2fc92efa499cf04.jpg",
    "https://preview.redd.it/chibi-miku-headpats-v0-8z3uwxc88gyc1.jpeg?width=640&crop=smart&auto=webp&s=99774e23c41c4de28fdc2107d5e117da6150fd30",
    "https://ih1.redbubble.net/image.3197067146.5107/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
    "https://e7.pngegg.com/pngimages/583/643/png-clipart-hatsune-miku-chibi-vocaloid-anime-animation-fictional-characters-cartoon.png",
    "https://preview.redd.it/chibi-miku-v0-m1st079gd34d1.jpeg?width=640&crop=smart&auto=webp&s=6e738acc0fb3d57353ca22530faefc6985f2f42a",
    "https://i.redd.it/9lvgoytie2p61.png",
    "https://pm1.aminoapps.com/6628/b5fc1523b5ab236ed322ce28032046a2fd7015e3_00.jpg",
    "https://upload-os-bbs.hoyolab.com/upload/2024/05/20/262624795/22afaf24d81569815f5846571ad9f77c_7695885870483566315.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70",
    "https://i0.wp.com/i.pinimg.com/originals/04/5c/dc/045cdcda2342fe43af91952cfdacadc4.jpg?resize=160,120",
    "https://s1.zerochan.net/Hatsune.Miku.600.977033.jpg"
]
let currentMiku = 0
function getRandomMiku() {
    let available = mikuLinks.filter((_, index) => index !== currentMiku);
    let newMiku = Math.floor(Math.random() * available.length);

    currentMiku = mikuLinks.indexOf(available[newMiku] ?? ""); // update currentMiku
    return mikuLinks[currentMiku] ?? "";
}
client.user.setAvatar(getRandomMiku())
const mikuMessages = [
    "It's Miku time! :3",
    "Miku 39 is hereee!",
    "Miku o'clock! :3",
    "Guess what? 39 means Miku! 💖",
    "Miku vibes at 39! :3",
    "39 is for Miku love! :3",
    "Surprise! 39 is Miku time! :3",
    "Miku 39 loves you! 💖",
    "Miku moment @ 39! :3",
    "Hey, 39 means Miku says hi! :3",
    "It's Miku 39 time!",
    "Miku magic @ 39! :3",
    "39? Must be Miku! :D",
    "Feel the Miku vibes at 39!",
    "Miku's favorite time: 39! :3",
    "39 x Miku = Happiness 💖",
    "Hey, it's Miku 39!",
    "Miku power @ 39! 💖",
    "39 brings Miku cheer! :D",
    "Miku's here at 39!",
    "Miku moment when it's 39! :3",
    "Yay! Miku 39 time!",
    "Miku love @ 39! 💖",
    "Counting on Miku 39! :3",
    "Guess what time? Miku 39 :3",
    "It's Miku o'clock at 39!",
    "Miku brightens your 39! 💖",
    "Celebrate 39 with Miku! :3",
    "Miku cheer @ 39!",
    "Miku magic at xx:39! 💖"
    ];
    function getRandomMikuMessage() {
        let randomIndex = Math.floor(Math.random() * mikuMessages.length);
        return mikuMessages[randomIndex] ?? "";
        }
cron.schedule('39 * * * *', async () => {
    await client.user.setAvatar(getRandomMiku())
    data.users.map(async (u) => await (await client.users.fetch(u).catch(() => null))?.send(getRandomMikuMessage()).catch(() => null))
});

defineChatCommand({
    name: "39-subscrib",
    description: "subscrib to 39!!!!!!!!!!!!"
}, async (i) => {
    if (data.users.find((u) => u == i.user.id)) return await  i.reply("you already subscribd!!!!!!!!")
    data.users.push(i.user.id)
    await i.reply("u ar now subscribd!!!!!!!")
})

defineChatCommand({
    name: "39-unsubscrib",
    description: "unsubscrib to 39 :c"
}, async (i) => {
    if (!data.users.find((u) => u == i.user.id)) return await  i.reply("you arent subscribd")
    data.users.filter((u) => u !== i.user.id)
    await i.reply("u ar now unsubscribd :c")
})