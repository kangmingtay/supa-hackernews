# supa-hackernews

## Description
A mobile app for hackernews built with react-native, supabase & postgres functions. Ideally, it would be faster to just poll the hackernews API directly to get the top, new, best stories but where's the fun in that? 

https://user-images.githubusercontent.com/28647601/128597270-8cec449e-0f69-46bc-b71d-f2eb797f32f5.MP4

## Implementation
* `client` contains react native code 

* `sql` contains sql functions run on supabase to get best & new stories every hour (uses [pg_cron](https://supabase.io/blog/2021/03/05/postgres-as-a-cron-server))

* `scraper` contains go code used to fetch ~2 years worth of hackernews stories (uses [postgrest-go](https://github.com/supabase/postgrest-go)) 

## Possible Improvements
* Use supabase hooks to trigger fetches on refresh?
