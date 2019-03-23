const db = require("../dbConfig.js");

module.exports = {
	/* returns
	"contexts": [
        {
            "context_name": "at_computer"
        },
        {
            "context_name": "at_home"
        }
    ]
	*/
	getContextsActions: id => {
		return db
			.select("context_name")
			.from("joinContextsActions")
			.where({ action_id: id })
			.innerJoin("contexts", "contexts.id", "joinContextsActions.context_id");
	}
};
