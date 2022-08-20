import { SURAH_TO_JUZ, JUZ_TO_SURAH, AyahAddition } from "./constants"


export const personalizationIsEmpty = (personalizationState = {}) => {
    // Implement check if any value null || length === 0
}

/**
 * TODO: CONVERT JUZ VALUE TO SURAH VALUE && VICE VERSA
 */
// Converting Juz to Surah:Ayah
export const generateSurahAyah = (juz) => {
    return JUZ_TO_SURAH[juz]
}

// Finding the belonging juz of given Surah:Ayah
export const findJuzFromAyah = (surah,ayah) => {
    if (surah >= 78) return 30
    if (surah >= 67) return 29
    if (surah >= 58) return 28
    if (typeof SURAH_TO_JUZ[surah] === 'number') return SURAH_TO_JUZ[surah]
    else {
        const keys = Object.keys(SURAH_TO_JUZ[surah])
        for (const key of keys) {
            const [first,last] = key.split('-')
            if (ayah >= first && ayah <= last) return SURAH_TO_JUZ[surah][key]
            else continue
        }
    }
}

export const generateAyahAudioUrl = (edition,ayahId) => {
    return `https://cdn.islamic.network/quran/audio/64/${edition}/${ayahId}.mp3`
}

export const getAyahId = (surah,ayah) => {
    return AyahAddition[String(surah)].addition + ayah
}

export const generatePlaylistItems = (
    surahStart,
    ayahStart,
    surahEnd,
    ayahEnd,
    edition
) => {
    let currentSurah = surahStart
    let currentAyah = ayahStart
    const playlistItems = []
    do {
        const maxAyah = AyahAddition[String(currentSurah)].ayah
        playlistItems.push(
            generateAyahAudioUrl(edition,getAyahId(currentSurah,currentAyah))
        )
        if (
            currentSurah === surahEnd &&
            currentAyah === ayahEnd
        ) break
        if (
            currentSurah === surahEnd &&
            currentAyah < ayahEnd
        ) {
            currentAyah++
            continue
        }
        if (currentAyah === maxAyah) {
            currentSurah++
            currentAyah = 1
            playlistItems.push(
                generateAyahAudioUrl(edition,getAyahId(1,1))
            )
        }
        else currentAyah++
    } while (
        currentSurah <= surahEnd
    )
    return playlistItems
}