describe('Page can be accessed', () => {
  it('successfully loads', () => {
    cy.visit("/uusi");
    cy.contains('Tee ilmoitus uudesta kohteesta');
  });
});

describe('Test form fields', () => {
  it('user has to fill all required fields in the form', () => {
    cy.visit("/uusi");
    cy.get('[id=newdescription]').type('newdescription');
    cy.get('[id=newlocationname]').type('newlocationname');
    cy.get('[id=newx]').type('25.34234323');
    cy.get('[id=newy]').type('60.42342334');
    cy.get('[id=newcoordinateinfo]').type('newcoordinateinfo');
    cy.get('[id=newdiverinfo]').type('newdiverinfo');
    cy.contains('Lähetä').click();
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('Lomakkeessa on virheitä tai sen tiedot ovat puutteellisia!');
    })
    cy.get('[id=newtargetform]').then($x => expect($x[0].checkValidity()).to.be.false);
    cy.get('[id=newname]').then($x => expect($x[0].checkValidity()).to.be.false);
  });

});

describe('Test submit', () => {
  it('user can submit', () => {
    cy.visit("/uusi");
    cy.get('[id=newname]').type('Test Tester');
    cy.get('[id=newemail]').type('tester@test.com');
    cy.get('[id=newphone]').type('0415063434');
    cy.get('[id=newdescription]').type('newdescription');
    cy.get('[id=newlocationname]').type('newlocationname');
    cy.get('[id=newx]').type('25.34234323');
    cy.get('[id=newy]').type('60.42342334');
    cy.get('[id=newcoordinateinfo]').type('newcoordinateinfo');
    cy.get('[id=newdiverinfo]').type('newdiverinfo');
    cy.contains('Lähetä').click();
    cy.get('[id=newtargetform]').then($x => expect($x[0].checkValidity()).to.be.true);
  });

});

describe('Test email and phone fields', () => {
  it('user has to fill email or phone', () => {
    cy.visit("/uusi");
    cy.get('[id=newname]').type('Test Tester');
    cy.get('[id=newdescription]').type('newdescription');
    cy.get('[id=newlocationname]').type('newlocationname');
    cy.get('[id=newx]').type('25.34234323');
    cy.get('[id=newy]').type('60.42342334');
    cy.get('[id=newcoordinateinfo]').type('newcoordinateinfo');
    cy.get('[id=newdiverinfo]').type('newdiverinfo');
    cy.contains('Lähetä').click();
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('Ilmoita puhelinnumero tai sähköpostiosoite!');
    })
  });

});
