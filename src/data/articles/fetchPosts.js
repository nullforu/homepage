import axios from 'axios'
import fs from 'fs'
import path from 'path'

axios
    .post(
        'https://v3.velog.io/graphql',
        {
            query: `
      query velogPosts($input: GetPostsInput!) {
        posts(input: $input) {
          id
          title
          short_description
          thumbnail
          user {
            id
            username
            profile {
              id
              thumbnail
              display_name
            }
          }
          series {
            name
            url_slug
          }
          url_slug
          released_at
          updated_at
          comments_count
          tags
          is_private
          likes
        }
      }
    `,
            variables: {
                input: {
                    username: 'yulmwu',
                    limit: 100,
                    tag: '',
                },
            },
        },
        {
            headers: {
                accept: '*/*',
                'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                priority: 'u=1, i',
                'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                referer: 'https://velog.io/',
            },
            withCredentials: true,
        }
    )
    .then((response) => {
        // console.log(response.data)
        const __dirname = path.resolve()
        const filePath = path.join(__dirname, 'src', 'data', 'articles', 'posts.json')
        fs.writeFileSync(filePath, JSON.stringify(response.data.data.posts, null, 2))
    })
    .catch((error) => {
        console.error(error)
    })
