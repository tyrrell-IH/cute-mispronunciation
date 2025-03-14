import { hiraganaToRoman } from "./hiraganaToRomanData.js";

export class Mispronunciation {
  #hiraganaCharacters;

  constructor(word) {
    this.#hiraganaCharacters = this.#splitIntoHiraganaCharacters(word);
  }

  #splitIntoHiraganaCharacters(word) {
    return word.match(/.ぁ|.ぃ|.ぅ|.ぇ|.ぉ|.ゃ|.ゅ|.ょ|./g);
  }

  #splitIntoPhonemes(hiraganaCharacters) {
    const romanCharacters = hiraganaCharacters
      .map((character, i) => {
        return { index: i, roman: hiraganaToRoman[character] };
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

  #pairUp(phonemes) {
    const pairs = [];
    for (let i = 0; i < phonemes.length; i++) {
      for (let j = i + 1; j < phonemes.length; j++) {
        pairs.push([phonemes[i], phonemes[j]]);
      }
    }
    return pairs;
  }

  #removeInvalidPairs(phonemesPairs) {
    return phonemesPairs.filter((pair) => {
      if (this.#isEachConsonantBlank(pair)) {
        return false;
      } else if (this.#isEachVowelN(pair)) {
        return false;
      } else if (this.#hasConsonantYAndVowelIE(pair)) {
        return false;
      } else if (this.#hasConsonantWAndVowelIUE(pair)) {
        return false;
      } else {
        return true;
      }
    });
  }

  #isEachConsonantBlank(pair) {
    return pair[0].consonant === "" && pair[1].consonant === "";
  }

  #isEachVowelN(pair) {
    return pair[0].vowel === "n" && pair[1].vowel === "n";
  }

  #hasConsonantYAndVowelIE(pair) {
    const hasYConsonant = pair.some((character) =>
      character.consonant.includes("y"),
    );
    if (hasYConsonant) {
      return (
        ["i", "e"].includes(pair[0].vowel) || ["i", "e"].includes(pair[1].vowel)
      );
    } else {
      return false;
    }
  }

  #hasConsonantWAndVowelIUE(pair) {
    const hasWConsonant = pair.some((character) =>
      character.consonant.includes("w"),
    );
    if (hasWConsonant) {
      return (
        ["i", "u", "e"].includes(pair[0].vowel) ||
        ["i", "u", "e"].includes(pair[1].vowel)
      );
    } else {
      return false;
    }
  }

  #pickPairAtRandom(validatedPairs) {
    return validatedPairs[Math.floor(Math.random() * validatedPairs.length)];
  }

  #swapConsonantAtRandom(pickedPair) {
    const consonantList = [pickedPair[0].consonant, pickedPair[1].consonant];
    if (!consonantList.includes("")) {
      consonantList.push("");
    }
    return pickedPair.map((character) => {
      if (character.vowel === "n") {
        return character;
      } else {
        return {
          ...character,
          consonant:
            consonantList[Math.floor(Math.random() * consonantList.length)],
        };
      }
    });
  }

  #createMispronunciationWord(consonantSwappedPair) {
    const hiraganaCharactersCopy = [...this.#hiraganaCharacters];
    consonantSwappedPair.forEach((character) => {
      const newRomanCharacter = character.consonant + character.vowel;
      hiraganaCharactersCopy[character.index] = Object.keys(
        hiraganaToRoman,
      ).find((key) => hiraganaToRoman[key] === newRomanCharacter);
    });
    return hiraganaCharactersCopy.join("");
  }

  create() {
    const phonemes = this.#splitIntoPhonemes(this.#hiraganaCharacters);
    const phonemesPairs = this.#pairUp(phonemes);
    const validatedPairs = this.#removeInvalidPairs(phonemesPairs);
    const pickedPair = this.#pickPairAtRandom(validatedPairs);
    const consonantSwappedPair = this.#swapConsonantAtRandom(pickedPair);
    return this.#createMispronunciationWord(consonantSwappedPair);
  }
}
