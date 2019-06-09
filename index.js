const HashMap = require ('./hashMap');
const HashMapChaining = require ('./hashMapSeprateChaining');

function main() {

    const seedData = [{"Hobbit": "Bilbo"}, {"Hobbit": "Frodo"},
    {"Wizard": "Gandolf"}, {"Human": "Aragon"}, {"Elf": "Legolas"}, {"Maiar": "The Necromancer"},
    {"Maiar": "Sauron"}, {"RingBearer": "Gollum"}, {"LadyOfLight": "Galadriel"}, {"HalfElven": "Arwen"},
    {"Ent": "Treebeard"}]

    const Ior = new HashMap();

    setHashMapValues(seedData, Ior);

    console.log(Ior)

    console.log(Ior.get("Maiar"));
    console.log(Ior.get("Hobbit"));

    //adding something with the same key will overide the old value

    //capacity is 24 which is 8(the initial capcity) * 3. The number of times the ratio went over 50%

    WhatDoesThisDo();

    console.log(removeDuplicates("google all that you think can think of"));

    groupAnangrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']);

    const chainingHash = new HashMapChaining();

    setHashMapValues(seedData, chainingHash);

    console.log(chainingHash);

    chainingHash.displayValues();

}

function removeDuplicates(string) {
    const letterTrackerMap = new HashMap();
    let noDuplicatesString = '';
    for (let i=0; i<string.length; i++) {
        let letterAlreadyUsed = letterTrackerMap.doesKeyExist(string[i]);
        if (!letterAlreadyUsed) {
            noDuplicatesString += string[i];
            letterTrackerMap.set(string[i], true)
        }
    }
    return noDuplicatesString;
}

function groupAnangrams(words) {
    //new hashmap
    const anagrams = new HashMap();
    //iterate words
    for (word of words) {
        const alphabitizeWord = alphabitize(word);

        if (anagrams.doesKeyExist(alphabitizeWord)) {
            let value = anagrams.get(alphabitizeWord);
            value.push(word);
            anagrams.set(alphabitizeWord, value)
        }
        else {
            anagrams.set(alphabitizeWord, [word])
        }
    }

    anagrams.displayValues();
}

function alphabitize(word) {
    const wordArray = word.split('');
    const sortedArray = wordArray.sort();
    const alphWord = sortedArray.join();
    return alphWord;

}

// output will be 
// 20
// 10
const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

function setHashMapValues(data, hashMap) {
    for (let newObject of data) {
        let objectKey = Object.keys(newObject)
        let objectvalue = Object.values(newObject)

        hashMap.set(objectKey[0], objectvalue[0])
    }
}

main()


