// Dependencies
const friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function (req, res) {

        friends.push(req.body);
        res.json(friendMatch(req.body, friends));
    });

    function friendMatch(newFriend, friends) {
        let bestMatch;

        let smallestDiff = 50;

        friends.forEach(friend => {
            let currentDiff = compareScoreDiff(friend, newFriend);

            if (currentDiff < smallestDiff) {
                bestMatch = friend;
                smallestDiff = currentDiff;
            }
        });
        return bestMatch;
    }

    function compareScoreDiff(friendA, friendB) {
        let totalDiff = 0;

        for (let i = 0; i < 10; i++) {
            totalDiff += Math.abs(friendA.scores[i] - friendB.scores[i]);
        };
        return totalDiff;

    }

};
