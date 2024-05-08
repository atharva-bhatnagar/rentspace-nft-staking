export function formatMetadata(){
    const str="{\22name\22:\22Minimalistic Villas#0\22,\22mimeType\22:\22image\22,\22url\22:\22https://cf-assets.yuku.app/BatchMint/Minimalistic/0.png\22,\22thumb\22:\22https://cf-assets.yuku.app/BatchMint/Minimalistic/0_thumb.png\22,\22description\22:\22This is the NFT from Minimalistic Villas collection\22,\22attributes\22:[{\22trait_type\22:\22Common\22,\22value\22:\22Common\22}]}"
    let val=str.split("\22").join('"')
    console.log(JSON.parse(val))
}