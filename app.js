const minecraftUsername = document.getElementById("minecraft-username");
const minecraftAvatar = document.getElementById("minecraft-avatar");

async function grabAvatar () {
    const username = minecraftUsername.value;

    const data = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`)
        .then((res) => res.json());

    minecraftAvatar.src = `https://crafatar.com/renders/head/${data.uuid}?overlay`;
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
