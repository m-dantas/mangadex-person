export interface MangaList {
    data: Manga[],
    limit: number,
    offset: number,
    response: string,
    result: string,
    total: number
}

type attributes = {
    title: {},
    altTitles: [],
    description: { en: string },
    isLocked: boolean,
    links: string,
    originalLanguage: string,
    lastVolume: string,
    lastChapter: string,
    publicationDemographic: string | null,
    status: string,
    year: string | null,
    contentRating: string,
    tags: [],
    state: string,
    chapterNumbersResetOnNewVolume: number,
    createdAt: string,
    updatedAt: string,
    version: number,
    availableTranslatedLanguages: [],
    latestUploadedChapter: string | null,
}

type relationships = {
    attributes?: {
        createdAt: string,
        description: string,
        fileName: string
        locale: string
        updatedAt: string
        version: number
        volume: string | null
    },
    id: string,
    type: string
}

export type Manga = {
    id: string,
    type: string,
    attributes: attributes,
    relationships: relationships
}