var video_out = document.getElementById("vid-box");
var callInput = document.getElementById("idInput");
var textS = document.getElementById("textShow");
var jb = document.getElementById("jokeButton");

var phone = window.phone = PHONE({
  number        : rkey, // given random number
  publish_key   : 'pub-c-da6a1135-eae5-44bb-86f5-3ebdd87d500b',
  subscribe_key : 'sub-c-445d9000-142a-11e8-91c1-eac6831c625c',
  ssl           : true
});
phone.ready(function(){});
phone.receive(function(session){
  session.connected(function(session) {
    video_out.appendChild(session.video);
    callInput.innerHTML = '';
    textS.innerHTML = '<textarea id="responseTextArea" class="UIInput" style="width:350px; height:75px;"></textarea>';
    jb.innerHTML = '<textarea id="responseTextArea" class="UIInput" style="width:350px; height:75px;"></textarea>';
  });
  session.ended(function(session) {
    video_out.innerHTML = '';
  });
});

function makeCall(form){
  phone.dial(form.number.value);
  return false;
}

var jokes = [
  {
    "id": 1,
    "type": "general",
    "setup": "What did the fish say when it hit the wall?",
    "punchline": "Damn."
  },
  {
    "id": 2,
    "type": "general",
    "setup": "How do you make a tissue dance?",
    "punchline": "You put a little boogie on it."
  },
  {
    "id": 3,
    "type": "general",
    "setup": "What's Forrest Gump's password?",
    "punchline": "1Forrest1"
  },
  {
    "id": 4,
    "type": "general",
    "setup": "What do you call a belt made out of watches?",
    "punchline": "A waist of time."
  },
  {
    "id": 5,
    "type": "general",
    "setup": "Why can't bicycles stand on their own?",
    "punchline": "They are two tired"
  },
  {
    "id": 6,
    "type": "general",
    "setup": "How does a train eat?",
    "punchline": "It goes chew, chew"
  },
  {
    "id": 7,
    "type": "general",
    "setup": "What do you call a singing Laptop",
    "punchline": "A Dell"
  },
  {
    "id": 8,
    "type": "general",
    "setup": "How many lips does a flower have?",
    "punchline": "Tulips"
  },
  {
    "id": 8,
    "type": "general",
    "setup": "How do you organize an outer space party?",
    "punchline": "You planet"
  },
  {
    "id": 9,
    "type": "general",
    "setup": "What kind of shoes does a thief wear?",
    "punchline": "Sneakers"
  },
  {
    "id": 10,
    "type": "general",
    "setup": "What's the best time to go to the dentist?",
    "punchline": "Tooth hurty."
  },
  {
    "id": 11,
    "type": "knock-knock",
    "setup": "Knock knock. \n Who's there? \n A broken pencil. \n A broken pencil who?",
    "punchline": "Never mind. It's pointless."
  },
  {
    "id": 12,
    "type": "knock-knock",
    "setup": "Knock knock. \n Who's there? \n Cows go. \n Cows go who?",
    "punchline": "No, cows go moo."
  },
  {
    "id": 13,
    "type": "knock-knock",
    "setup": "Knock knock. \n Who's there? \n Little old lady. \n Little old lady who?",
    "punchline": "I didn't know you could yodel!"
  },
  {
    "id": 14,
    "type": "programming",
    "setup": "What's the best thing about a Boolean?",
    "punchline": "Even if you're wrong, you're only off by a bit."
  },
  {
    "id": 15,
    "type": "programming",
    "setup": "What's the object-oriented way to become wealthy?",
    "punchline": "Inheritance"
  },
  {
    "id": 16,
    "type": "programming",
    "setup": "Where do programmers like to hangout?",
    "punchline": "The Foo Bar."
  },
  {
    "id": 17,
    "type": "programming",
    "setup": "Why did the programmer quit his job?",
    "punchline": "Because he didn't get arrays."
  },
  {
    "id": 18,
    "type": "general",
    "setup": "Did you hear about the two silk worms in a race?",
    "punchline": "It ended in a tie."
  },
  {
    "id": 19,
    "type": "general",
    "setup": "What do you call a laughing motorcycle?",
    "punchline": "A Yamahahahaha."
  },
  {
    "id": 20,
    "type": "general",
    "setup": "A termite walks into a bar and says...",
    "punchline": "'Where is the bar tended?'"
  },
  {
    "id": 21,
    "type": "general",
    "setup": "What does C.S. Lewis keep at the back of his wardrobe?",
    "punchline": "Narnia business!"
  },
  {
    "id": 22,
    "type": "programming",
    "setup": "Why do programmers always mix up Halloween and Christmans?",
    "punchline": "Because Oct 31 == Dec 25"
  },
  {
    "id": 23,
    "type": "programming",
    "setup": "A SQL query walks into a bar, walks up to two tables and asks...",
    "punchline": "'Can I join you?'"
  },
  {
    "id": 24,
    "type": "programming",
    "setup": "How many programmers does it take to change a lightbulb?",
    "punchline": "None that's a hardware problem"
  },
  {
    "id": 25,
    "type": "programming",
    "setup": "If you put a million monkeys at a million keyboards, one of them will eventually write a Java program",
    "punchline": "the rest of them will write Perl"
  },
  {
    "id": 26,
    "type": "programming",
    "setup": "['hip', 'hip']",
    "punchline": "(hip hip array)"
  },
  {
    "id": 27,
    "type": "programming",
    "setup": "To understand what recursion is...",
    "punchline": "You must first understand what recursion is"
  },
  {
    "id": 28,
    "type": "programming",
    "setup": "There are 10 types of people in this world...",
    "punchline": "Those who understand binary and those who don't"
  },
  {
    "id": 29,
    "type": "general",
    "setup": "What did the duck say when he bought lipstick?",
    "punchline": "Put it on my bill"
  },
  {
    "id": 30,
    "type": "general",
    "setup": "What happens to a frog's car when it breaks down?",
    "punchline": "It gets toad away"
  },
  {
    "id": 31,
    "type": "general",
    "setup": "did you know the first French fries weren't cooked in France?",
    "punchline": "they were cooked in Greece"
  },
  {
    "id": 32,
    "type": "programming",
    "setup": "Which song would an exception sing?",
    "punchline": "Can't catch me - Avicii"
  },
  {
    "id": 33,
    "type": "knock-knock",
    "setup": "Knock knock. \n Who's there? \n Opportunity.",
    "punchline": "That is impossible. Opportunity doesn’t come knocking twice!"
  },
  {
    "id": 34,
    "type": "programming",
    "setup": "Why do Java programmers wear glasses?",
    "punchline": "Because they don't C#"
  }
]

function tellRJoke() {
  var random_index = Math.floor(Math.random() * jokes.length);
  var r_joke = jokes[random_index];

  $("#responseTextArea").val(r_joke.setup + "\n" + r_joke.punchline);
}
