import hiraganaToRoman from "./hiraganaToRomanData.js";

export default class Mispronunciation {
  #hiraganaCharacters;

  constructor(word) {
    this.#hiraganaCharacters = this.#splitIntoHiraganaCharacters(word);
  }

  create() {
    const hiraganaPhonemes = this.#splitIntoHiraganaPhonemes(
      this.#hiraganaCharacters,
    );
    const consonantList = this.#createConsonantList(hiraganaPhonemes);
    //全ての文字の子音を交換対象とすると元の言葉の雰囲気がなくなってしまうので、子音交換文字数の最大値をhiraganaPhonemes.length - 1にしています
    const swapCount = this.#getSwapCount(1, hiraganaPhonemes.length - 1);
    const pickedHiraganaPhonemes = this.#pickHiraganaPhonemes(
      hiraganaPhonemes,
      swapCount,
    );
    const hiraganaPhonemesSwappedConsonant = this.#swapConsonant(
      pickedHiraganaPhonemes,
      consonantList,
    );
    return this.#createMispronunciationWord(hiraganaPhonemesSwappedConsonant);
  }

  #splitIntoHiraganaCharacters(word) {
    return word.match(/.ぁ|.ぃ|.ぅ|.ぇ|.ぉ|.ゃ|.ゅ|.ょ|./g);
  }

  #splitIntoHiraganaPhonemes(hiraganaCharacters) {
    const romanCharacters = hiraganaCharacters
      .map((hiraganaCharacter, i) => {
        return { index: i, roman: hiraganaToRoman[hiraganaCharacter] };
      })
      .filter((character) => character.roman);

    return romanCharacters.map((character) => {
      return {
        index: character.index,
        consonant: character.roman.slice(0, -1),
        vowel: character.roman.slice(-1),
      };
    });
  }

  #createConsonantList(hiraganaPhonemes) {
    const consonantList = [];
    hiraganaPhonemes.forEach((hiraganaPhoneme) => {
      if (!consonantList.includes(hiraganaPhoneme.consonant)) {
        consonantList.push(hiraganaPhoneme.consonant);
      }
    });
    return consonantList;
  }

  #getSwapCount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #pickHiraganaPhonemes(hiraganaPhonemes, swapCount) {
    const hiraganaPhonemesCopy = [...hiraganaPhonemes];
    for (let i = hiraganaPhonemesCopy.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [hiraganaPhonemesCopy[i], hiraganaPhonemesCopy[j]] = [
        hiraganaPhonemesCopy[j],
        hiraganaPhonemesCopy[i],
      ];
    }
    return hiraganaPhonemesCopy.slice(0, swapCount);
  }

  #swapConsonant(pickedHiraganaPhonemes, consonantList) {
    return pickedHiraganaPhonemes.map((hiraganaPhoneme) => {
      const validatedConsonantList = this.#validateConsonantList(
        consonantList,
        hiraganaPhoneme.vowel,
      );
      if (hiraganaPhoneme.vowel === "n") {
        return hiraganaPhoneme;
      } else {
        return {
          ...hiraganaPhoneme,
          consonant:
            validatedConsonantList[
              Math.floor(Math.random() * validatedConsonantList.length)
            ],
        };
      }
    });
  }

  #validateConsonantList(consonantList, vowel) {
    const consonantListCopy = [...consonantList];
    if (vowel === "i" || vowel === "e") {
      return consonantListCopy.filter(
        (consonant) => consonant !== "w" && !consonant.split("").includes("y"),
      );
    } else if (vowel === "u") {
      return consonantListCopy.filter((consonant) => consonant !== "w");
    } else {
      return consonantListCopy;
    }
  }

  #createMispronunciationWord(hiraganaPhonemesSwappedConsonant) {
    const hiraganaCharactersCopy = [...this.#hiraganaCharacters];
    hiraganaPhonemesSwappedConsonant.forEach((hiraganaPhoneme) => {
      const romanCharacter = hiraganaPhoneme.consonant + hiraganaPhoneme.vowel;
      hiraganaCharactersCopy[hiraganaPhoneme.index] = Object.keys(
        hiraganaToRoman,
      ).find((key) => hiraganaToRoman[key] === romanCharacter);
    });
    return hiraganaCharactersCopy.join("　");
  }
}
