function validateAdminAnswer(req, res, next) {
    const { puzzleAnswer } = req.body;
    const { randomPuzzle } = req.session; // Assuming you're saving the puzzle in session
    console.log(randomPuzzle, puzzleAnswer)
    if (!randomPuzzle || puzzleAnswer !== randomPuzzle.answer) {
        return res.render('admin', {
            errors: { puzzleAnswer: 'Incorrect answer to the puzzle' },
            data: req.body, // Keeps the user's form data
            randomPuzzle: randomPuzzle // Re-render the same puzzle
        });
    }

    next(); // If the answer is correct, proceed to the next middleware
}


module.exports = {
    validateAdminAnswer
};