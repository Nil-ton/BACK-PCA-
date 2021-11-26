import { DataJson } from "../app.js"

const title = document.querySelector('#title')
const img = document.querySelector('#img')
const subtitle = document.querySelector('#subtitle')
const article = document.querySelector('#article')
const select = document.querySelector('#select')

const debounce = (fn, delay) => {
  let timer;
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

let sendPost = (url, data) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}


sendPost = debounce(sendPost, 1000)

document.querySelector('button').addEventListener('click', () => {
  const data = {
    page: select.value,
    title: title.value.toUpperCase(),
    img: img.value,
    subtitle: subtitle.value,
    article: article.value
  }
  sendPost(`http://localhost:3000/post/?page=${select.value}`, data)
})



article.addEventListener('keyup', (e) => {
  document.querySelector('#preview').innerHTML = e.target.value
})


const urlEdit = window.location.href.split('?')
const getInfoEdit = async () => {
  const data = await new DataJson(urlEdit[1]).dataPage()
  const dataEdit = data.filter((item, i) => {
    if (i === Number(urlEdit[2])) {
      return true
    }
  })
  dataEdit.forEach(dataEdit => {
    if(!dataEdit){
      document.querySelector('body').innerHTML = '<h1>Não existe esse artigo!</h1>'
      return
    }
    title.value = dataEdit.title
    img.value = dataEdit.img
    article.value = dataEdit.article
    subtitle.value = dataEdit.subtitle
    select.value = dataEdit.page
  })

  document.querySelector('button').addEventListener('click', () => {
    const postEdit = {
      page: select.value,
      title: title.value.toUpperCase(),
      img: img.value,
      subtitle: subtitle.value,
      article: article.value
    }
  
    sendPost(`http://localhost:3000/post/edit/${urlEdit[1]}/${urlEdit[2]}`, postEdit)
  })
}

if (urlEdit.length === 3) {
  getInfoEdit()
}
