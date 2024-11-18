import { Manga } from "../services/manga/types"

export function GET_COVER_URL (manga: Manga, withSize: boolean) {
    const filename = manga.relationships.find(item => item.type === 'cover_art')?.attributes?.fileName
    const url = withSize ? `${manga.id}/${filename}.256.jpg` : `${manga.id}/${filename}`
    return url
}