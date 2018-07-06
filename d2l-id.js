export const Id = {

	getUniqueId: function() {

		if (Id._unique_index === undefined) {
			Id._unique_index = 0;
		}
		Id._unique_index++;
		return 'd2l-uid-' + Id._unique_index;

	}

};

window.D2L = window.D2L || {};
window.D2L.Id = Id;
