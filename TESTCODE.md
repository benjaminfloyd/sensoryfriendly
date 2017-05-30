// ADD A NEW ITEM
router.post('/:userId/locations', function (request, response) {
    // grab the user ID we want to create a new item for
    var userId = request.params.userId;
    // then grab the new Item that we created using the form
    var newItemName = request.body.name;
    // Find the User in the database we want to save the new Item for
    Restaurant.findById(userId)
        .exec(function (err, user) {
            // add a new Item to the User's list of locations, using the data
            // we grabbed off of the form
            user.locations.push(new Item({ name: newItemName }));
            // once we have added the new Item to the user's collection 
            // of locations, we can save the user
            user.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                // once the user has been saved, we can redirect back 
                // to the User's show page, and we should see the new item
                response.redirect('/restaurants/' + userId);
            })
        });
});