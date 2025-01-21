export class RecommendationEngine {
  constructor(books) {
    this.books = books;
  }

  // Calculate similarity score between user preferences and a book
  calculateSimilarity(userPreferences, book) {
    let score = 0;
    
    // Genre matching
    const genreMatch = book.genres.filter(genre => 
      userPreferences.genres.includes(genre)
    ).length;
    score += genreMatch * 2; // Weight genre matches heavily
    
    // Rating matching (if user has rating preference)
    if (userPreferences.minRating) {
      score += book.rating >= userPreferences.minRating ? 1 : -1;
    }
    
    // Year matching (if user has year preference)
    if (userPreferences.yearRange) {
      const [minYear, maxYear] = userPreferences.yearRange;
      if (book.year >= minYear && book.year <= maxYear) {
        score += 1;
      }
    }
    
    return score;
  }

  getRecommendations(userPreferences, limit = 3) {
    // Calculate similarity scores for all books
    const scoredBooks = this.books.map(book => ({
      ...book,
      score: this.calculateSimilarity(userPreferences, book)
    }));
    
    // Sort by score and return top recommendations
    return scoredBooks
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}
