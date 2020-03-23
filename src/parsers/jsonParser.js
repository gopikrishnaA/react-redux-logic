const getJokesParser = (items) => {
    return items.map(item => ({
        id: item.id,
        joke: item.joke,
        status: item.status,
        createDate: new Date(item.create_date).toLocaleString()
    })).sort((a, b) => {
        return a.createDate > b.createDate ? -1
            : a.createDate < b.createDate ? 1 : 0;
      })
}

export {
    getJokesParser
}