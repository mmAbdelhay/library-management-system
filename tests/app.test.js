const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const userApp = require('../server');
const token = require("../services/token");
const db = require("../database/models");

const getToken = async () => {
    const borrower = await db.Borrower.findOne({
        where: {id: 1},
    })
    return token.generateToken(borrower.id, "borrower");
}

describe('Books API', () => {
    it('should return a list of books', async () => {

        const res = await request(userApp)
            .get(`/books`)
            .set('Authorization', `Bearer ${await getToken()}`);

        const books = await db.Book.findAll({raw: true});

        books.forEach((book) => {
            book.createdAt = book.createdAt.toISOString();
            book.updatedAt = book.updatedAt.toISOString();
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.deep.equal(books);
    });
});

describe('Borrowers API', () => {
    it('should return a list of borrowers', async () => {

        const res = await request(userApp)
            .get(`/borrowers`)
            .set('Authorization', `Bearer ${await getToken()}`);

        const borrowers = await db.Borrower.findAll({raw: true});

        borrowers.forEach((borrower) => {
            borrower.createdAt = borrower.createdAt.toISOString();
            borrower.updatedAt = borrower.updatedAt.toISOString();
            borrower.registeredDate = borrower.registeredDate.toISOString();
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.deep.equal(borrowers);
    });
});
