const minecraftUsername = document.getElementById("minecraft-username");
const minecraftAvatar = document.getElementById("minecraft-avatar");
const types = document.getElementsByName("type");
const size = document.getElementById("size");

const avatarType = {
    avatar: "avatars",
    head: "renders/head",
    body: "renders/body",
    skin: "skins",
    cape: "capes",
}

async function grabAvatar () {
    const username = minecraftUsername.value;

    const data = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`)
        .then((res) => res.json());

    for (const type of types) {
        if (!type.checked) continue;
        console.log(type);


        minecraftAvatar.src = `https://crafatar.com/${avatarType[type.id.substring(5)]}/${data.uuid}?overlay&size=${size.value}`;
    }

}

async function downloadAvatar () {
    if (!minecraftAvatar.src) return alert("Error");


    const imageBlob = await fetch(minecraftAvatar.src)
        .then((res) => res.blob())
        .then((blob) => URL.createObjectURL(blob));

    const link = document.createElement("a");
    link.href = imageBlob;
    link.download = minecraftUsername.value + ".png";
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link);

}
