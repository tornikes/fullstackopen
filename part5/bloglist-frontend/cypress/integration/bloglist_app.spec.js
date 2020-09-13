describe('bloglist app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        cy.visit('http://localhost:3000');

        const zombie = {
            name: 'Zombie McZombie',
            username: 'zombie',
            password: 'eat-the-living'
        };
        cy.request('POST', 'http://localhost:3001/api/users', zombie);
    });

    it('frontpage can be opened', function () {
        cy.contains('Log in to application');
    });

    describe('login form', function () {
        it('can log in', function () {
            cy.get('#username').type('zombie');
            cy.get('#password').type('eat-the-living');
            cy.get('#login-button').click();
            cy.contains('Hello, Zombie McZombie');
        });

        it('should fail when username or password are wrong', function () {
            cy.get('#username').type('zombie');
            cy.get('#password').type('eat-th-living');
            cy.get('#login-button').click();
            cy.contains('Username or password invalid');
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
        });
    });

    describe('when logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username: 'zombie',
                password: 'eat-the-living'
            }).then(response => {
                localStorage.setItem('loggedInUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            });
        });

        it('should be able to create a new blog', function () {
            cy.contains('New Blog').click();
            cy.get('#title').type('Lambda the Ultimate');
            cy.get('#author').type('Gerald Sussman');
            cy.get('#url').type('lambda.mit.edu');
            cy.contains('Create').click();
            cy.contains('Lambda the Ultimate Gerald Sussman');
        });

        describe('user can interact with blog', function () {
            beforeEach(function () {
                cy.contains('New Blog').click();
                cy.get('#title').type('Lambda the Ultimate');
                cy.get('#author').type('Gerald Sussman');
                cy.get('#url').type('lambda.mit.edu');
                cy.contains('Create').click();
                cy.contains('Lambda the Ultimate Gerald Sussman');
            });

            it('should be able to like the post', function () {
                cy.contains('View').click();
                cy.contains('Hide').parent().find('.likes').should('have.text', '0');
                cy.contains('Hide').parent().contains('Like').click();
                cy.contains('Hide').parent().find('.likes').should('have.text', '1');
            });

            it('should be able to delete the post', function () {
                cy.contains('View').click();
                cy.contains('Hide').parent().contains('remove').click();
                cy.contains('Lambda the Ultimate Gerald Sussman').should('not.exist');
            });

            it.only('should sort blogs by number of likes', function () {
                const seedData = [
                    {
                        title: 'How to oop',
                        author: 'Alan Key',
                        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                        likes: 6
                    },
                    {
                        title: 'Go To Statement Considered Harmful',
                        author: 'Edsger W. Dijkstra',
                        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                        likes: 7
                    },
                    {
                        title: 'Lets talk big about smalltalk',
                        author: 'Alan Key',
                        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                        likes: 16
                    }
                ];

                const token = JSON.parse(localStorage.getItem('loggedInUser')).token;
                for (let data of seedData) {
                    cy.request({
                        method: 'POST',
                        url: 'http://localhost:3001/api/blogs',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${token}`
                        },
                        body: data
                    });
                }
                cy.visit('http://localhost:3000');
                cy.get('.blog-info > button')
                    .then(response => {
                        response.click();
                    })
                    .then(() => {
                        return cy.get('.likes');
                    })
                    .then(res => {
                        let previous = Infinity;
                        for (let span of res) {
                            let num = parseFloat(span.innerText);
                            expect(num).not.to.be.greaterThan(previous);
                            previous = num;
                        }
                    });
            });
        });
    });
});