function dummy() {
    return 1;
}

function totalLikes(items) {
    if (!items.length) {
        return 0;
    } else {
        return items.reduce((total, item) => total + item.likes, 0);
    }
}

function favoriteBlog(items) {
    if (!items.length) return null;
    let largest = { likes: -Infinity };
    for (let item of items) {
        if (largest.likes < item.likes) {
            largest = item;
        }
    }
    return {
        title: largest.title,
        author: largest.author,
        likes: largest.likes
    };
}

function mostBlogs(items) {
    if (!items.length) return null;

    const blogCounts = items.reduce((counts, blog) => {
        counts[blog.author] = counts[blog.author] + 1 || 1;
        return counts;
    }, {});

    let largestCount = ['', -Infinity];
    for (let [author, count] of Object.entries(blogCounts)) {
        if (count > largestCount[1]) {
            largestCount = [author, count];
        }
    }

    return {
        author: largestCount[0],
        blogs: largestCount[1]
    };
}

function mostLikes(items) {
    if (!items.length) return null;

    const blogCounts = items.reduce((counts, blog) => {
        counts[blog.author] = counts[blog.author] + blog.likes || blog.likes;
        return counts;
    }, {});

    let largestCount = ['', -Infinity];
    for (let [author, count] of Object.entries(blogCounts)) {
        if (count > largestCount[1]) {
            largestCount = [author, count];
        }
    }

    return {
        author: largestCount[0],
        likes: largestCount[1]
    };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};