const fs = require('fs')
const path = require('path')

const convertAyahData = async () => {
    const initialSurahData = await JSON.parse(fs.readFileSync(path.resolve(__dirname, './assets/mushaf/juz30/content/surah.json')).toString())
    const newSurahData = initialSurahData.map((surah) => {
        return {
            number: surah.number,
            name: {
                ar:  surah.name.short,
                id: surah.name.transliteration.id,
                translation: surah.name.translation.id
            },
            ayah: surah.verses.map((ayah) => {
                return {
                    id: ayah.number.inQuran,
                    number: ayah.number.inSurah,
                    text: ayah.text.arab,
                    translation: ayah.translation.id
                }
            })
        }
    })
    await fs.writeFile(path.resolve(__dirname, './assets/mushaf/juz30/content/data.json'), JSON.stringify(newSurahData), (err) => {
        if (err) console.log('error')
        else console.log('Success')
    })
}

convertAyahData()