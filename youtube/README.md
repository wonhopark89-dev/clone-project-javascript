# NodeJS

```
npm run dev
```

---

## Route

/ -> Home
/join -> Join
/login -> Login
/search -> Search

/users/edit -> Edit user
/users/remove -> Remove user

/videos/watch -> Watch Video
/videos/edit -> Edit Video
/videos/delete -> Delete Video
/videos/comments -> Comments on a video
/videos/comments/delete -> Delete a Comments on a video

---

### Babel

https://babeljs.io/setup#installation

- Babel is a JavaScript compiler
- 최신 자바스크립트 문법으로 작성한 코드가 nodeJS 에서 이해할 수 있도록 해줌

---

### nodemon

- package.json -> "script" 옵션에 추가

```
nodemon --exec npm run babel-node -- path/to/script.js
```

---

### morgan

- https://www.npmjs.com/package/morgan
