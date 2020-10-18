new Vue({
    el: '#axios-app',
    data: {
        customer_data: [],
        showData: false
    },
    methods: {
        createData: function createData(){
            var self = this;
            var name = document.querySelector(".name-modal-input").value;
            var email = document.querySelector(".email-modal-input").value;
            axios({
                method: 'post',
                url: 'https://jsonplaceholder.typicode.com/users',
                data: {
                    name: name,
                    email: name
                }
            })
            .then(function (response){
                self.customer_data.push({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email
                });
            })
        },
        updateData: function updateData(id, name){
            var self = this;
            var new_email = document.querySelector("#"+name.replace(' ', '-')+"-"+id).value;
            axios({
                method: 'put',
                url: 'https://jsonplaceholder.typicode.com/users/'+id,
                data: {
                    email: new_email
                }
            })
            .then(function(response){
                for(var i = 0; i < self.customer_data.length; i++){
                    if(response.data.id === self.customer_data[i].id){
                        self.customer_data[i].email = new_email;
                    }
                }
            });
        },
        readData: function readData(){
            var self = this;
            self.customer_data = [];
            self.showData = true;
            axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/users'
            })
            .then(function (response) {
                for(var i = 0; i < response.data.length; i++){
                    self.customer_data.push(response.data[i]);
                }
            });
        },
        deleteData: function deleteData(id){
            var self = this;
            axios({
                method: 'delete',
                url: 'https://jsonplaceholder.typicode.com/users/'+id
            })
            .then(function(response){
                if(Object.keys(response.data).length === 0){
                    for(var i = 0; i < self.customer_data.length; i++){
                        if(self.customer_data[i].id == id){
                            var index = self.customer_data.indexOf(self.customer_data[i]);
                            if (index > -1) {
                                self.customer_data.splice(index, 1);
                            }
                        }
                    }
                }
            });
        }
    }
});