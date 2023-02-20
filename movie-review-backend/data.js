import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Admin',
      email: 'moyo@admin.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
  ],
  movies: [
    {
      name: 'Avengers: Endgame1',
      year: '2019',
      rating: 88,
      review: 'Avengers Assemble',
      tags: 'Superhero, Action, Fiction',
    },
    {
      name: 'Avengers: Endgame2',
      year: '2019',
      rating: 88,
      review: 'Avengers Assemble',
      tags: 'Superhero, Action, Fiction',
    },
    {
      name: 'Avengers: Endgame3',
      year: '2019',
      rating: 88,
      review: 'Avengers Assemble',
      tags: 'Superhero, Action, Fiction',
    },
    {
      name: 'Avengers: Endgame4',
      year: '2019',
      rating: 88,
      review: 'Avengers Assemble',
      tags: 'Superhero, Action, Fiction',
    },
  ],
};
export default data;
