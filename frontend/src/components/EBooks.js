import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/EBooks.css';

const EBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookToConfirm, setBookToConfirm] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Function to split book content into chapters
  const getChapterContent = (book, chapterIndex) => {
    if (!book) return '';
    
    // Split the content into three chapters
    const contentLength = book.content.length;
    const chapterSize = Math.floor(contentLength / 3);
    
    if (chapterIndex === 0) {
      return book.content.substring(0, chapterSize);
    } else if (chapterIndex === 1) {
      return book.content.substring(chapterSize, chapterSize * 2);
    } else {
      return book.content.substring(chapterSize * 2);
    }
  };

  // Sample e-book data with 12 books
  const ebooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 9.99,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A classic novel about the American Dream set in the Jazz Age.",
      content: "Chapter 1\n\nIn my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.\n\n'Whenever you feel like criticizing anyone,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'\n\nHe didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought — frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth."
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 8.99,
      cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A powerful story of racial injustice and moral growth in the American South.",
      content: "Chapter 1\n\nWhen he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury. His left arm was somewhat shorter than his right; when he stood or walked, the back of his hand was at right angles to his body, his thumb parallel to his thigh. He couldn't have cared less, so long as he could pass and punt.\n\nWhen enough years had gone by to enable us to look back on them, we sometimes discussed the events leading to his accident. I maintain that the Ewells started it all, but Jem, who was four years my senior, said it started long before that. He said it began the summer Dill came to us, when Dill first gave us the idea of making Boo Radley come out."
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: 7.99,
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A dystopian novel about totalitarianism, surveillance, and thought control.",
      content: "Chapter 1\n\nIt was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.\n\nThe hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features. Winston made for the stairs. It was no use trying the lift. Even at the best of times it was seldom working, and at present the electric current was cut off during daylight hours. It was part of the economy drive in preparation for Hate Week. The flat was seven flights up, and Winston, who was thirty-nine and had a varicose ulcer above his right ankle, went slowly, resting several times on the way. On each landing, opposite the lift-shaft, the poster with the enormous face gazed from the wall. It was one of those pictures which are so contrived that the eyes follow you about when you move. BIG BROTHER IS WATCHING YOU, the caption beneath it ran."
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 6.99,
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A romantic novel of manners about the pursuit of love and marriage.",
      content: "Chapter 1\n\nIt is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\n\nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.\n\n'My dear Mr. Bennet,' said his lady to him one day, 'have you heard that Netherfield Park is let at last?'\n\nMr. Bennet replied that he had not.\n\n'But it is,' returned she; 'for Mrs. Long has just been here, and she told me all about it.'\n\nMr. Bennet made no answer.\n\n'Do you not want to know who has taken it?' cried his wife impatiently.\n\n'You want to tell me, and I have no objection to hearing it.'"
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 10.99,
      cover: "https://images.unsplash.com/photo-1531901599143-df5010ab9438?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A fantasy adventure about a hobbit's journey to reclaim treasure from a dragon.",
      content: "Chapter 1: An Unexpected Party\n\nIn a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.\n\nIt had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle. The door opened on to a tube-shaped hall like a tunnel: a very comfortable tunnel without smoke, with panelled walls, and floors tiled and carpeted, provided with polished chairs, and lots and lots of pegs for hats and coats—the hobbit was fond of visitors. The tunnel wound on and on, going fairly but not quite straight into the side of the hill—The Hill, as all the people for many miles round called it—and many little round doors opened out of it, first on one side and then on another. No going upstairs for the hobbit: bedrooms, bathrooms, cellars, pantries (lots of these), wardrobes (he had whole rooms devoted to clothes), kitchens, dining-rooms, all were on the same floor, and indeed on the same passage. The best rooms were all on the left-hand side (going in), for these were the only ones to have windows, deep-set round windows looking over his garden, and meadows beyond, sloping down to the river."
    },
    {
      id: 6,
      title: "Brave New World",
      author: "Aldous Huxley",
      price: 8.49,
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A dystopian novel exploring a genetically-engineered future society.",
      content: "Chapter 1\n\nA SQUAT grey building of only thirty-four stories. Over the main entrance the words, CENTRAL LONDON HATCHERY AND CONDITIONING CENTRE, and, in a shield, the World State's motto, COMMUNITY, IDENTITY, STABILITY.\n\nThe enormous room on the ground floor faced towards the north. Cold for all the summer beyond the panes, for all the tropical heat of the room itself, a harsh thin light glared through the windows, hungrily seeking some draped lay figure, some pallid shape of academic goose-flesh, but finding only the glass and nickel and bleakly shining porcelain of a laboratory. Wintriness responded to wintriness. The overalls of the workers were white, their hands gloved with a pale corpse-coloured rubber. The light was frozen, dead, a ghost. Only from the yellow barrels of the microscopes did it borrow a certain rich and living substance, lying along the polished tubes like butter, streak after luscious streak in long recession down the work tables."
    },
    {
      id: 7,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: 7.49,
      cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A novel about teenage alienation and loss of innocence.",
      content: "Chapter 1\n\nIf you really want to hear about it, the first thing you'll probably want to know is where I was born, and what my lousy childhood was like, and how my parents were occupied and all before they had me, and all that David Copperfield kind of crap, but I don't feel like going into it, if you want to know the truth. In the first place, that stuff bores me, and in the second place, my parents would have about two hemorrhages apiece if I told anything pretty personal about them. They're quite touchy about anything like that, especially my father. They're nice and all—I'm not saying that—but they're also touchy as hell. Besides, I'm not going to tell you my whole goddam autobiography or anything. I'll just tell you about this madman stuff that happened to me around last Christmas just before I got pretty run-down and had to come out here and take it easy."
    },
    {
      id: 8,
      title: "Moby Dick",
      author: "Herman Melville",
      price: 9.49,
      cover: "https://images.unsplash.com/photo-1528459105426-b9548367069b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "An epic tale of obsession, revenge, and the sea.",
      content: "Chapter 1: Loomings\n\nCall me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off—then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me."
    },
    {
      id: 9,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      price: 12.99,
      cover: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "An epic high-fantasy adventure about the quest to destroy a powerful ring.",
      content: "Chapter 1: A Long-expected Party\n\nWhen Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.\n\nBilbo was very rich and very peculiar, and had been the wonder of the Shire for sixty years, ever since his remarkable disappearance and unexpected return. The riches he had brought back from his travels had now become a local legend, and it was popularly believed, whatever the old folk might say, that the Hill at Bag End was full of tunnels stuffed with treasure. And if that was not enough for fame, there was also his prolonged vigour to marvel at. Time wore on, but it seemed to have little effect on Mr. Baggins. At ninety he was much the same as at fifty. At ninety-nine they began to call him well-preserved; but unchanged would have been nearer the mark. There were some that shook their heads and thought this was too much of a good thing; it seemed unfair that anyone should possess (apparently) perpetual youth as well as (reputedly) inexhaustible wealth."
    },
    {
      id: 10,
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      price: 7.99,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A novel about a young woman's journey to independence and love.",
      content: "Chapter 1\n\nThere was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner (Mrs. Reed, when there was no company, dined early) the cold winter wind had brought with it clouds so sombre, and a rain so penetrating, that further outdoor exercise was now out of the question.\n\nI was glad of it: I never liked long walks, especially on chilly afternoons: dreadful to me was the coming home in the raw twilight, with nipped fingers and toes, and a heart saddened by the chidings of Bessie, the nurse, and humbled by the consciousness of my physical inferiority to Eliza, John, and Georgiana Reed.\n\nThe said Eliza, John, and Georgiana were now clustered round their mama in the drawing-room: she lay reclined on a sofa by the fireside, and with her darlings about her (for the time neither quarrelling nor crying) looked perfectly happy. Me, she had dispensed from joining the group; saying, 'She regretted to be under the necessity of keeping me at a distance; but that until she heard from Bessie, and could discover by her own observation, that I was endeavouring in good earnest to acquire a more sociable and childlike disposition, a more attractive and sprightly manner—something lighter, franker, more natural, as it were—she really must exclude me from privileges intended only for contented, happy, little children.'"
    },
    {
      id: 11,
      title: "The Odyssey",
      author: "Homer",
      price: 6.99,
      cover: "https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "An ancient Greek epic poem about Odysseus's journey home after the Trojan War.",
      content: "Book I\n\nTell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home. Tell me, too, about all these things, O daughter of Jove, from whatsoever source you may know them.\n\nSo now all who escaped death in battle or by shipwreck had got safely home except Ulysses, and he, though he was longing to return to his wife and country, was detained by the goddess Calypso, who had got him into a large cave and wanted to marry him. But as years went by, there came a time when the gods settled that he should go back to Ithaca; even then, however, when he was among his own people, his troubles were not yet over; nevertheless all the gods had now begun to pity him except Neptune, who still persecuted him without ceasing and would not let him get home."
    },
    {
      id: 12,
      title: "Frankenstein",
      author: "Mary Shelley",
      price: 8.99,
      cover: "https://images.unsplash.com/photo-1515098506762-79e1384e9d8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "A Gothic novel about a scientist who creates a sapient creature in an unorthodox experiment.",
      content: "Letter 1\n\nTo Mrs. Saville, England\n\nSt. Petersburgh, Dec. 11th, 17—\n\nYou will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.\n\nI am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes. Inspirited by this wind of promise, my daydreams become more fervent and vivid. I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight. There, Margaret, the sun is forever visible, its broad disk just skirting the horizon and diffusing a perpetual splendour."
    }
  ];

  // Filter books based on search term
  const filteredBooks = ebooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle book click to show confirmation popup
  const handleBookClick = (book) => {
    setBookToConfirm(book);
    setShowConfirmation(true);
  };
  
  // Handle confirmation to start reading
  const handleConfirmReading = () => {
    setSelectedBook(bookToConfirm);
    setShowConfirmation(false);
    setCurrentChapter(0);
  };
  
  // Handle cancellation of reading
  const handleCancelReading = () => {
    setShowConfirmation(false);
    setBookToConfirm(null);
  };
  
  // Handle navigation to next chapter with page flip animation
  const handleNextChapter = () => {
    if (currentChapter < 2) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentChapter(currentChapter + 1);
        setIsFlipping(false);
      }, 500);
    }
  };
  
  // Handle navigation to previous chapter with page flip animation
  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentChapter(currentChapter - 1);
        setIsFlipping(false);
      }, 500);
    }
  };

  // Close the book view modal
  const closeBookView = () => {
    setSelectedBook(null);
    setCurrentChapter(0);
  };

  return (
    <div className="ebooks-container">
      <div className="ebooks-header">
        <h1>E-Books Collection</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="ebooks-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="ebook-card" onClick={() => handleBookClick(book)}>
            <div className="ebook-cover">
              <img src={book.cover} alt={book.title} />
            </div>
            <div className="ebook-info">
              <h3>{book.title}</h3>
              <p className="ebook-author">{book.author}</p>
              <p className="ebook-price">${book.price.toFixed(2)}</p>
              <p className="ebook-description">{book.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showConfirmation && (
        <div className="confirmation-overlay" onClick={handleCancelReading}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Start Reading</h3>
            <p>Would you like to start reading "{bookToConfirm.title}"?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={handleConfirmReading}>Yes</button>
              <button className="cancel-button" onClick={handleCancelReading}>No</button>
            </div>
          </div>
        </div>
      )}

      {selectedBook && (
        <div className="ebook-modal-overlay" onClick={closeBookView}>
          <div className="ebook-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ebook-modal-header">
              <h2>{selectedBook.title}</h2>
              <button className="close-button" onClick={closeBookView}>×</button>
            </div>
            <div className="ebook-modal-content">
              <div className="ebook-modal-info">
                <img src={selectedBook.cover} alt={selectedBook.title} className="ebook-modal-cover" />
                <div className="ebook-modal-details">
                  <p className="ebook-modal-author">By {selectedBook.author}</p>
                  <p className="ebook-modal-price">${selectedBook.price.toFixed(2)}</p>
                  <p className="ebook-modal-description">{selectedBook.description}</p>
                </div>
              </div>
              <div className="chapter-navigation">
                <button 
                  className="chapter-nav-button" 
                  onClick={handlePrevChapter} 
                  disabled={currentChapter === 0}
                >
                  Previous Chapter
                </button>
                <span className="chapter-indicator">Chapter {currentChapter + 1} of 3</span>
                <button 
                  className="chapter-nav-button" 
                  onClick={handleNextChapter} 
                  disabled={currentChapter === 2}
                >
                  Next Chapter
                </button>
              </div>
              <div className={`book-page ${isFlipping ? 'flipping' : ''}`}>
                <div className="ebook-content">
                  <pre>{getChapterContent(selectedBook, currentChapter)}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EBooks;