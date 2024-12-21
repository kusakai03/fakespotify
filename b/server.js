const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const app = express();
const port = 8000;


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
  }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// MySQL Connection Setup
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',     
    password: '',      
    database: 'singurdb' 
});

db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL: ', err);
      return;
    }
    console.log('Connected to MySQL');
  });
  

  const verify = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, "kusagame", (e, decoded) => {
        if (e) {
          return res.json({ Error: "Token verification error: " + e.message });
        } else {
          req.name = decoded.name;
          next();
        }
      });
    } else {
      return res.json({ Error: "No token provided" });
    }
  };
  
  //Get current login user
  app.get('/verify', verify, (req, res) => {
    const sql = "SELECT * from suser WHERE username = ?";
    db.query(sql, [req.name], (e, data) => {
      if (e) {
        return res.json({ Error: "Database error: " + e.message });
      }
      if (data.length > 0) {
        return res.json({ Status: "Success", data: data[0] });
      } else {
        return res.json({ Status: "User not found" + req.name });
      }
    });
  });

//Get user by id
app.get('/user/:id', (req, res) =>{
    const id = req.params.id;
    const sql = "select a.username, a.userMail, u.* from suser a inner join suserpart u on a.userID = u.userID where a.userID = ?";
    db.query(sql, [id], (error, data) => {
      if (error) throw error;
      res.json({Status: "Success", data: data});
    });
  });  
 
//Get all comments by songID
app.get('/comments/:id', (req, res) =>{
  const id = req.params.id;
  const sql = "select c.*, a.username, u.userNickname, u.userPFP from ssongcomment c inner join suser a on c.userID = a.userID inner join suserpart u on c.userID = u.userID where c.songID = ?";
  db.query(sql, [id], (error, data) => {
    if (error) throw error;
    res.json({Status: "Success", data: data});
  });
});  

//Get music by id
app.get('/music/:id', (req, res) =>{
  const id = req.params.id;
  const sql = "select v.*, vp.* from smusic v inner join smusicpart vp on v.songID = vp.songID where v.songID = ?";
  db.query(sql, [id], (error, data) => {
    if (error) throw error;
    res.json({Status: "Success", data: data});
  });
});


//Get all upload by user id
app.get('/userupload/:userid', (req, res) =>{
  const id = req.params.userid;
  const sql = "select v.*, vp.* from smusic v inner join smusicpart vp on v.songID = vp.songID where v.userID = ?";
  db.query(sql, [id], (error, data) => {
    if (error) throw error;
    res.json({Status: "Success", data: data});
  });
});

//if this user followed the video user
app.get('/followedUser/:accID/:followID', (req, res) =>{
  const accID = req.params.accID;
  const followID = req.params.followID;
  const sql = "select * from sfollower where userID = ? and followID = ?";
  db.query(sql, [accID, followID], (error, data) => {
    if (error) throw error;
    res.json({Status: "Success", data:data});
  });
});

//get all followed user by userID
app.get('/allfolloweduser/:accID', (req, res) =>{
  const accID = req.params.accID;
  const sql = "select fl.followID, u.username, up.userNickname, up.userPFP from sfollower fl inner join suser u on fl.followID = u.userID inner join "+
  " suserpart up on u.userID = up.userID where fl.userID = ?";
  db.query(sql, [accID], (error, data) => {
    if (error) throw error;
    res.json({Status: "Success", data:data});
  });
});

//if this user liked the music
app.get('/likedmusic/:accID/:songID', (req, res) =>{
  const accID = req.params.accID;
  const songID = req.params.songID;
  const sql = "select * from slikedmusic where userID = ? and songID = ?";
  db.query(sql, [accID, songID], (error, data) => {
    if (error) throw error;
    res.json({Status: "Success", data:data});
  });
});

//Get all music
app.get('/allmusic', (req, res) =>{
  const sql = "select v.songID, v.songName, v.uploadDate, v.songArtist, v.songPath, vp.songImage, vp.songLike, vp.songStream, v.userID, a.username, u.userFollower, u.userPFP, u.userNickname "+
              "from smusic v " +
              "inner join smusicpart vp on v.songID = vp.songID " +
              "inner join suser a on v.userID = a.userID "+
              "inner join suserpart u on a.userID = u.userID order by v.uploadDate desc limit 30";
  db.query(sql, (e,data) =>{
    if (e) throw e;
    return res.json({Status: "Success", data: data});
  })
})

// checking if user exist
app.get('/accountExist/:accName/:accMail', (req, res) => {
    const sql = "SELECT * FROM suser WHERE username = ? or userMail = ?";
    db.query(sql, [req.params.accName, req.params.accMail], (e, data) => {
      if (e)
        throw e;
      return res.json({Status: "Success", data: data});
    });
  });

//get all playlist by userID
app.get('/userplaylists/:userID', (req, res) =>{
  const sql = "select * from splaylist where userID = ?";
  db.query(sql, [req.params.userID], (e, data) =>{
    if (e)
      throw e;
    return res.json({Status: "Success", data: data});
  })
})

//get playlist by id
app.get('/playlist/:playlistID', (req, res) =>{
  const sql = "select * from splaylist where playlistID = ?";
  db.query(sql, [req.params.playlistID], (e, data) =>{
    if (e)
      throw e;
    return res.json({Status: "Success", data: data});
  })
})

//get all liked songs
app.get('/likedsong/:userID', (req, res) =>{
  const sql = "select lm.*, m.songName, m.songGenre, m.songArtist, "+
  "mp.songImage, mp.songStream from slikedmusic lm inner join smusic m on lm.songID = m.songID "+
  " inner join smusicpart mp on m.songID = mp.songID where lm.userID = ?";
  db.query(sql, [req.params.userID], (e, data) =>{
    if (e)
      throw e;
    return res.json({Status: "Success", data: data});
  })
})

//get all song by playlistID
app.get('/playlistsongs/:playlistID', (req, res) =>{
  const sql = "select pls.*, m.songName, m.songGenre, m.songArtist, "+
  "mp.songImage, mp.songStream from splaylistsong pls inner join smusic m on pls.songID = m.songID "+
  " inner join smusicpart mp on m.songID = mp.songID where pls.playlistID = ?";
  db.query(sql, [req.params.playlistID], (e, data) =>{
    if (e)
      throw e;
    return res.json({Status: "Success", data: data});
  })
})

//get a song playlist by genre and sort by date and stream
app.get('/songgenre/:genre/:sort', (req, res) => {
  const { genre, sort } = req.params;

  const validSortColumns = ['uploadDate', 'songStream'];
  if (!validSortColumns.includes(sort)) {
      return res.status(400).json({ error: 'NO no no' });
  }

  const sortColumn = sort === 'songStream' ? 'mp.songStream' : `m.${sort}`;

  const query = `
      SELECT m.songID, m.songName, m.songArtist, m.songGenre, m.uploadDate, mp.songStream, mp.songLike, mp.songImage
      FROM smusic m 
      INNER JOIN smusicpart mp ON m.songID = mp.songID
      WHERE m.songGenre LIKE ?
      ORDER BY ${sortColumn} DESC
      limit 100;
  `;

  const genreSearch = `%${genre}%`;

  db.query(query, [genreSearch], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results);
  });
});



app.get('/logout', (req, res) =>{
    res.clearCookie('token');
    return res.json({Status: "Success"});
  })

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "coverImage") {
                cb(null, "public/images/");
            } else if (file.fieldname === "audioFile") {
                cb(null, "public/musics/");
            } else if (file.fieldname === "userPFP"){
                cb(null, "public/pfps/");
            }
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + path.extname(file.originalname));
        }
    })
});

//Login
app.post("/login", (req, res) => {
  const sql = "SELECT suser.*, suserpart.userPassword FROM suser inner join suserpart on suser.userID = suserpart.userID  WHERE username = ?";
  db.query(sql, [req.body.username], (e, data) => {
    if (e) {
      return res.json({ Error: "Database error: " + e.message });
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].userPassword, (e, resp) => {
        if (e) {
          return res.json({ Error: "Comparison error: " + e.message });
        }
        if (resp) {
          const name = data[0].username;
          const token = jwt.sign({ name }, "kusagame", { expiresIn: '1d' });
          res.cookie('token', token);
          return res.json({ Status: "Success", data: data[0] });
        } else {
          return res.json({ Status: "Incorrect password" });
        }
      });
    } else {
      return res.json({ Status: "User not found" });
    }
  });
});

//Register
app.post("/register", (req, res) => {
  const sql1 = "insert into suser (userID, username, userMail) values (?,?,?)";
  const sql2 = "insert into suserpart (userID, userPassword) values (?,?)";
  const id = "acc" + uuid.v4().replace(/-/g, '').slice(0, 9);
  bcrypt.hash(req.body.password.toString(), 10, (e, hash) => {
    if (e) return res.json(({Error}));
    db.query(sql1, [id, req.body.username, hash, req.body.email], (er, data) =>{
      if (er) {
        throw er;
      }
      db.query(sql2, [id, hash], (err, data) => {
        if (err) {
          throw err;
        }
        db.commit((err) => {
          if (err) {
            throw err;
          }
          res.json({ Status: "Success" });
        });
      });
    });
  });
});

//add playlist
app.post('/addplaylist', (req, res) =>{
  const sql = "insert into splaylist (playlistID, userID, playlistName) value (?,?,?)";
  const id = "pl" + uuid.v4().replace(/-/g, '').slice(0, 9);
  db.query(sql, [id, req.body.userID, req.body.playlistName], (e, data) =>{
    if (e) throw e;
    res.json({Status: "Success", data: data});
  })
})

//follow user
app.post('/follow', (req, res) =>{
  const accID = req.body.accID;
  const followID = req.body.followID;
  const sql = "insert into sfollower (userID, followID) values (?, ?)";
  db.query(sql, [accID, followID], (error, data) => {
    if (error) throw error;
    const updateSql = "update suserpart set userFollower = userFollower + 1 where userID = ?"
    db.query(updateSql, [followID], (err, data) =>{
      if (err) throw err;
    });
    res.json({Status: "Success", data: data});
  });
});

app.post('/stream/:songID', (req, res) =>{
  const sql = "update smusicpart set songStream = songStream + 1 where songID = ?"
    db.query(sql, [req.params.songID], (err, data) =>{
      if (err) throw err;
      res.json({Status: "Success", data: data});
    });
}
)
//unfollow user
app.post('/unfollow', (req, res) =>{
  const accID = req.body.accID;
  const followID = req.body.followID;
  const sql = "delete from sfollower where userID = ? and followID = ?";
  db.query(sql, [accID, followID], (error, data) => {
    if (error) throw error;
    const updateSql = "update suserpart set userFollower = userFollower - 1 where userID = ?"
    db.query(updateSql, [followID], (err, data) =>{
      if (err) throw err;
    });
    res.json({Status: "Success", data: data});
  });
});

//like the music
app.post('/like', (req, res) =>{
  const songID = req.body.songID;
  const userID = req.body.userID;
  const sql = "insert into slikedmusic (songID, userID) values (?, ?)";
  db.query(sql, [songID, userID], (error, data) => {
    if (error) throw error;
    const updateSql = "update smusicpart set songLike = songLike + 1 where songID = ?";
    db.query(updateSql, [songID], (err, data) =>{
      if (err) throw err;
    });
    res.json({Status: "Success", data: data});
  });
});

//dislike the video
app.post('/dislike', (req, res) =>{
  const songID = req.body.songID;
  const userID = req.body.userID;
  const sql = "delete from slikedmusic where songID = ? and userID = ?";
  db.query(sql, [songID, userID], (error, data) => {
    if (error) throw error;
    const updateSql = "update smusicpart set songLike = songLike - 1 where songID = ?";
    db.query(updateSql, [songID], (err, data) =>{
      if (err) throw err;
    });
    res.json({Status: "Success", data: data});
  });
});

//add song to playlist
app.post('/addtoplaylist', (req, res) =>{
  const songID = req.body.songID;
  const playlistID = req.body.playlistID;
  const sql = "insert into splaylistsong (songID, playlistID) values (?,?)";
  db.query(sql, [songID, playlistID], (err, data) =>{
    if (err) throw err;
    res.json({Status: "Success", data: data});
  });
})

//comment to song post
app.post("/addcmt", (req, res) =>{
  sql = "insert into ssongcomment (cmtID, userID, songID, cmt) value (?,?,?,?)";
  const id = "cmt" + uuid.v4().replace(/-/g, '').slice(0, 10);
  db.query(sql, [id, req.body.userID, req.body.songID, req.body.cmt], (e, data) =>{
    if (e) throw e;
    res.json(data);
  })
})

//like the comment
app.post('/likecmt', (req, res) =>{
  const sql = "update ssongcomment set cmtLike = cmtLike + 1 where cmtID = ?";
  db.query(sql, [req.body.cmtID], (error, data) => {
    if (error) throw error;
    res.json({Status: "Success", data: data});
  });
});

//change password
app.post("/changePassword", (req, res) => {
  const { currentPassword, newPassword, userID } = req.body;
  db.query("SELECT userPassword FROM suserpart WHERE userID = ?", [userID], (err, data) => {
    if (err) return res.status(500).json({ message: "Lỗi server." });
    const hashedPassword = data[0].userPassword;
    if (!bcrypt.compareSync(currentPassword, hashedPassword)) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng." });
    }
    const newHashedPassword = bcrypt.hashSync(newPassword, 10);
    db.query(
      "UPDATE suserpart SET userPassword = ? WHERE userID = ?",
      [newHashedPassword, userID],
      (err) => {
        if (err) return res.status(500).json({ message: "Lỗi server." });
        return res.status(200).json({ message: "Đổi mật khẩu thành công!" });
      }
    );
  });
});

//update user profile
app.post("/editProfile/:userid", upload.single('userPFP'), (req, res) =>{
  const userid = req.params.userid;
  const {username, userDescription} = req.body;
  const newPfp = req.file?.filename;
  db.query("select userPFP from suserpart where userID = ?", [userid], (e, data) =>{
    if (e) throw e;
    res.json(data);
    const currentPfp = data[0]?.userPFP;
    db.query("update suserpart set userPFP = ?, userDescription = ?, userNickname = ? where userID = ?",
      [newPfp, userDescription, username, userid], (e, data) =>{
      if (e) throw e;
      if (currentPfp){
        const oldPfpPath = path.join('public/pfps', currentPfp);
        fs.unlink(oldPfpPath, (e) =>{
          if (e) throw e;
        });
      }
    });
  });
});

//upload music
app.post('/uploadmusic', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'audioFile', maxCount: 1 }
]), (req, res) => {
    const name = req.body.audioName;
    const artist = req.body.artistName;
    const lyrics = req.body.lyrics;
    const genre = req.body.genre;
    const userID = req.body.userID;
    const songPath = req.files["audioFile"][0]?.filename; 
    const imagePath = req.files["coverImage"] ? req.files["coverImage"][0].filename : null;
    if (!songPath) {
        return res.status(400).json({ error: songPath +'Audio file is required' });
    }
    db.beginTransaction((e) => {
        if (e) throw e;
        const sql1 = "insert into smusic (songID, songName, songGenre, songArtist, songPath, userID) values (?, ?, ?, ?, ?, ?)";
        const sql2 = "insert into smusicpart (songID, songImage, songLyric) values (?, ?, ?)";
    
        const makesongID = "sur" +uuid.v4().replace(/-/g, '').slice(0, 9);
        db.query(sql1, [makesongID, name, genre, artist, songPath, userID], (err, data) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: 'Insert into smusic failed' });
            });
          }
          db.query(sql2, [makesongID, imagePath, lyrics], (err, data) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: 'Insert into smusicpart failed' });
              });
            }
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({ error: 'Commit failed' });
                });
              }
              res.json({ Status: "Success" });
            });
          });
        });
      });
});

app.use((req, res) => {
    res.status(404).send('cai gi day');
    });
      
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});