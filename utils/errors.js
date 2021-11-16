class ValidationError extends Error {
}

class NotFoundError extends Error {
}

function handleError(err, req, res, next) {
    console.log(err instanceof ValidationError)
    if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error', {
                message: 'Can\'t find an element with this ID.'
            })
    }


    res.status(err instanceof ValidationError ? 400 : 500);

    res.render('error', {
        message: err instanceof ValidationError ? err.message : 'Sorry, try again later.',
    });

}


module.exports = {
    handleError,
    ValidationError,
    NotFoundError
}
