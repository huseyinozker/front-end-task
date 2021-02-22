
window.onload = function init(){
	var wordCount=0;
	var letterCount=0;
    var words=[];
    var lengthArray=[];
    var str;
    var strText;
    var pattern = /(\s|['?.!,#])/g
    /****** Stop Words array for English Lang ******/
    var stopWordsEng=[, "a", "able", "about", "above", "abst", "accordance", "according", "accordingly", "across", "act", "actually", "added", "adj", "affected", "affecting", "affects", "after", "afterwards", "again", "against", "ah", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "announce", "another", "any", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "apparently", "approximately", "are", "aren", "arent", "arise", "around", "as", "aside", "ask", "asking", "at", "auth", "available", "away", "awfully", "b", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "being", "believe", "below", "beside", "besides", "between", "beyond", "biol", "both", "brief", "briefly", "but", "by", "c", "ca", "came", "can", "cannot", "can't", "cause", "causes", "certain", "certainly", "co", "com", "come", "comes", "contain", "containing", "contains", "could", "couldnt", "d", "date", "did", "didn't", "different", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "due", "during", "e", "each", "ed", "edu", "effect", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "especially", "et", "et-al", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "except", "f", "far", "few", "ff", "fifth", "first", "five", "fix", "followed", "following", "follows", "for", "former", "formerly", "forth", "found", "four", "from", "further", "furthermore", "g", "gave", "get", "gets", "getting", "give", "given", "gives", "giving", "go", "goes", "gone", "got", "gotten", "h", "had", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "hed", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "hereupon", "hers", "herself", "hes", "hi", "hid", "him", "himself", "his", "hither", "home", "how", "howbeit", "however", "hundred", "i", "id", "ie", "if", "i'll", "im", "immediate", "immediately", "importance", "important", "in", "inc", "indeed", "index", "information", "instead", "into", "invention", "inward", "is", "isn't", "it", "itd", "it'll", "its", "itself", "i've", "j", "just", "k", "keep	keeps", "kept", "kg", "km", "know", "known", "knows", "l", "largely", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked", "likely", "line", "little", "'ll", "look", "looking", "looks", "ltd", "m", "made", "mainly", "make", "makes", "many", "may", "maybe", "me", "mean", "means", "meantime", "meanwhile", "merely", "mg", "might", "million", "miss", "ml", "more", "moreover", "most", "mostly", "mr", "mrs", "much", "mug", "must", "my", "myself", "n", "na", "name", "namely", "nay", "nd", "near", "nearly", "necessarily", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "nor", "normally", "nos", "not", "noted", "nothing", "now", "nowhere", "o", "obtain", "obtained", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "omitted", "on", "once", "one", "ones", "only", "onto", "or", "ord", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "owing", "own", "p", "page", "pages", "part", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "poorly", "possible", "possibly", "potentially", "pp", "predominantly", "present", "previously", "primarily", "probably", "promptly", "proud", "provides", "put", "q", "que", "quickly", "quite", "qv", "r", "ran", "rather", "rd", "re", "readily", "really", "recent", "recently", "ref", "refs", "regarding", "regardless", "regards", "related", "relatively", "research", "respectively", "resulted", "resulting", "results", "right", "run", "s", "said", "same", "saw", "say", "saying", "says", "sec", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sent", "seven", "several", "shall", "she", "shed", "she'll", "shes", "should", "shouldn't", "show", "showed", "shown", "showns", "shows", "significant", "significantly", "similar", "similarly", "since", "six", "slightly", "so", "some", "somebody", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically", "specified", "specify", "specifying", "still", "stop", "strongly", "sub", "substantially", "successfully", "such", "sufficiently", "suggest", "sup", "sure"
                     
                     ]
    /****** Stop Words array for Turkish Lang ******/
    var stopWordsTr=["acaba", "altmış", "altı", "ama", "ancak", "arada", "aslında", "ayrıca", "bana", "bazı", "belki", "ben", "benden", "beni", "benim", "beri", "beş", "bile", "bin", "bir", "birçok", "biri", "birkaç", "birkez", "birşey", "birşeyi", "biz", "bize", "bizden", "bizi", "bizim", "böyle", "böylece", "bu", "buna", "bunda", "bundan", "bunlar", "bunları", "bunların", "bunu", "bunun", "burada", "çok", "çünkü", "da", "daha", "dahi", "de", "defa", "değil", "diğer", "diye", "doksan", "dokuz", "dolayı", "dolayısıyla", "dört", "edecek", "eden", "ederek", "edilecek", "ediliyor", "edilmesi", "ediyor", "eğer", "elli", "en", "etmesi", "etti", "ettiği", "ettiğini", "gibi", "göre", "halen", "hangi", "hatta", "hem", "henüz", "hep", "hepsi", "her", "herhangi", "herkesin", "hiç", "hiçbir", "için", "iki", "ile", "ilgili", "ise", "işte", "itibaren", "itibariyle", "kadar", "karşın", "katrilyon", "kendi", "kendilerine", "kendini", "kendisi", "kendisine", "kendisini", "kez", "ki", "kim", "kimden", "kime", "kimi", "kimse", "kırk", "milyar", "milyon", "mu", "mü", "mı", "nasıl", "ne", "neden", "nedenle", "nerde", "nerede", "nereye", "niye", "niçin", "o", "olan", "olarak", "oldu", "olduğu", "olduğunu", "olduklarını", "olmadı", "olmadığı", "olmak", "olması", "olmayan", "olmaz", "olsa", "olsun", "olup", "olur", "olursa", "oluyor", "on", "ona", "ondan", "onlar", "onlardan", "onları", "onların", "onu", "onun", "otuz", "oysa", "öyle", "pek", "rağmen", "sadece", "sanki", "sekiz", "seksen", "sen", "senden", "seni", "senin", "siz", "sizden", "sizi", "sizin", "şey", "şeyden", "şeyi", "şeyler", "şöyle", "şu", "şuna", "şunda", "şundan", "şunları", "şunu", "tarafından", "trilyon", "tüm", "üç", "üzere", "var", "vardı", "ve", "veya", "ya", "yani", "yapacak", "yapılan", "yapılması", "yapıyor", "yapmak", "yaptı", "yaptığı", "yaptığını", "yaptıkları", "yedi", "yerine", "yetmiş", "yine", "yirmi", "yoksa", "yüz", "zaten", "mi", "onlari", "acep", "adeta", "artık", "aynen", "az", "bari", "bazen", "başka", "biraz", "bütün", "dahil", "daima", "dair", "dayanarak", "fakat", "halbuki", "hani", "hariç", "hele", "herkes", "iken", "ila", "ilk", "illa", "iyi", "iyice", "kanımca", "kere", "keşke", "kısaca", "lakin", "madem", "meğer", "nere", "nitekim", "sonra", "veyahut", "yahut", "şayet", "şimdi", "amma", "anca", "emme", "gah", "gerek", "hakeza", "hoş", "imdi", "ister", "kah", "keza", "kezalik", "mademki", "mamafih", "meğerki", "meğerse", "netekim", "neyse", "oysaki", "velev", "velhasıl", "velhasılıkelam", "yalnız", "yok", "zira", "açıkça", "açıkçası", "adamakıllı", "bilcümle", "binaen", "binaenaleyh", "birazdan", "birden", "birdenbire", "birice", "birlikte", "bitevi", "biteviye", "bittabi", "bizatihi", "bizce", "bizcileyin", "bizzat", "boşuna", "böylecene", "böylelikle", "böylemesine", "böylesine", "buracıkta", "buradan", "büsbütün", "çabuk", "çabukça", "çeşitli", "çoğu", "çoğun", "çoğunca", "çoğunlukla", "çokça", "çokluk", "çoklukla", "cuk", "dahilen", "demin", "demincek", "deminden", "derakap", "derhal", "derken", "elbet", "elbette", "enikonu", "epey", "epeyce", "epeyi", "esasen", "esnasında", "etraflı", "etraflıca", "evleviyetle", "evvel", "evvela", "evvelce", "evvelden", "evvelemirde", "evveli", "gayet", "gayetle", "gayri", "gayrı", "geçende", "geçenlerde", "gene", "gerçi", "gibilerden", "gibisinden", "gine", "halihazırda", "haliyle", "handiyse", "hasılı", "hulasaten", "illaki", "itibarıyla", "iyicene", "kala", "külliyen", "lütfen", "nasılsa", "nazaran", "nedeniyle", "nedense", "nerden", "nerdeyse", "nereden", "neredeyse", "neye", "neyi", "nice", "nihayet", "nihayetinde", "oldukça", "onca", "önce", "önceden", "önceleri", "öncelikle", "onculayın", "oracık", "oracıkta", "orada", "oradan", "oranca", "oranla", "oraya", "öylece", "öylelikle", "öylemesine", "pekala", "pekçe", "peki", "peyderpey", "sahi", "sahiden", "sonradan", "sonraları", "sonunda", "şuncacık", "şuracıkta", "tabii", "tam", "tamam", "tamamen", "tamamıyla", "tek", "vasıtasıyla", "yakinen", "yakında", "yakından", "yakınlarda", "yalnızca", "yeniden", "yenilerde", "yoluyla", "yüzünden", "zati", "ait", "değin", "dek", "denli", "doğru", "gelgelelim", "gırla", "hasebiyle", "ilen", "indinde", "inen", "kaffesi", "kelli", "Leh", "maada", "mebni", "naşi", "zarfında", "öbür", "başkası", "beriki", "birbiri", "birçoğu", "birileri", "birisi", "birkaçı", "bizimki", "burası", "çokları", "çoklarınca", "cümlesi", "diğeri", "filanca", "hangisi", "hiçbiri", "iş", "kaçı", "kaynak", "kimisi", "kimsecik", "kimsecikler", "neresi", "öbürkü", "öbürü", "onda", "öteki", "ötekisi", "öz", "sana", "şunlar", "şunun", "şura", "şuracık", "şurası", "leh"
                    
                    ];
        
	document.getElementById("AnalyzeBtn").onclick = function(){
        resetVariables();
        if(str.length>0){
            document.getElementById('wordCounterTxt').innerHTML="Word Count: " + countWord().toString();
            document.getElementById('letterCounterTxt').innerHTML="Number of Letter: " + countLetter().toString();
            document.getElementById('longestWordTxt').innerHTML="Longest Word: " + findLongest();
            document.getElementById('averageLengthTxt').innerHTML="Average Word Length: " + findAvLen();
            document.getElementById('durationTxt').innerHTML="Reading Duration in Seconds: " + computeDuration();
            document.getElementById('medWordLenTxt').innerHTML="Median Word Length: " + computeMedWordLen();
            document.getElementById('medWordTxt').innerHTML="Median Word When Sorted: <br>" + findMedWord();
            document.getElementById('mostComTxt').innerHTML="Most Common Word <br>" +
            findMostCommon();
            document.getElementById('langTxt').innerHTML="Language: " + detectLanguage() +
                "<span>*works better with long sentences</span>";
            console.log(words);
        }
	}
	function countWord(){
		var spaceCount=0;/* set count to zero every counting */

		var i;
		for(i=0;i<str.length;i++){
			if(str[i]==' '){
				spaceCount = spaceCount +1;
			}
		}
		wordCount = spaceCount + 1;
        return wordCount
		
	}
	function countLetter(){
		letterCount=0;
		var i;
		for(i=0;i<str.length;i++){
			if(pattern.test(str[i])==false){
				letterCount++;
			}
		}
        return letterCount;
		
        
	}
    function findLongest(){
        var longestWord = [];
        var currentWord=[];
        var counter=0;
        var counterTemp=0;
        var i;
        for(i=0;i<str.length;i++){
            if(pattern.test(str[i])==false){
                currentWord.push(str[i]);
                counterTemp++;
            }
            if(str[i]==' ' || i==str.length-1){
                if(counterTemp>=counter){
                    longestWord=currentWord;
                    counter=counterTemp
                    
                }
                words.push(currentWord.join(""));
                lengthArray.push(counterTemp);
                counterTemp=0;
                currentWord=[];
            }
        }
        var longestString = longestWord.join("");
        return longestString;
    }
    function findAvLen(){
        var sum = lengthArray.reduce((a,b) => a+b,0)
        var average = sum/wordCount;
        return Math.round(average);
    }
    function computeDuration(){
        var duration = wordCount/2;
        return duration;
    }
    function computeMedWordLen(){
        var medIndex = Math.floor(words.length/2);
        var wordString = words[medIndex];
        return wordString.length;
    }
    function findMedWord(){
        /* finding median word when sorted by word length */
        var sortedWords = words.sort(function(a,b){ return b.length - a.length; });
        var medIndex = Math.floor(sortedWords.length/2);
        var medWordStr = sortedWords[medIndex];
        return medWordStr;
    }
    function findMostCommon(){
        var i
        var j;
        var repeat=0;
        var tempRepeat=0;
        var mostCommonIndex=0;
        for(i=0;i<words.length;i++){
            for(j=0;j<words.length;j++){
                if(words[j]==words[i]){
                    tempRepeat++;
                    if(tempRepeat>=repeat){
                        repeat=tempRepeat;
                        mostCommonIndex=i;
                        
                    }
                }
            }
            tempRepeat=0;
        }
        return words[mostCommonIndex];
    }
    function detectLanguage(){
        var i;
        var countEng=0;
        var countTr=0;
        for(i=0;i<stopWordsEng.length;i++){
            if(words.includes(stopWordsEng[i])==true){
                countEng++;
            }
        }
        for(i=0;i<stopWordsTr.length;i++){
            if(words.includes(stopWordsTr[i])==true){
                countTr++;
            }
        }
        console.log(countEng +" Tr: " + countTr);
        if(countTr>=countEng){
            return "Turkish";
        }else if(countEng>countTr){
            return "English";
        }else{
            return "Unknown";
        }
    } 
    function resetVariables(){
        str = document.getElementById('TextArea').value;
        str = str.replace(/['.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        strText=str;
        str = str.split('');
        wordCount=0;
        letterCount=0;
        lengthArray=[];
        words = [];
    }
}