# supa-hackernews

## Description
A mobile app for hackernews built with react-native, supabase & postgres functions

https://user-images.githubusercontent.com/28647601/128597270-8cec449e-0f69-46bc-b71d-f2eb797f32f5.MP4

## Implementation
* `client` contains react native code 

* `sql` contains sql functions run on supabase to get best & new stories every hour

* `scraper` contains go code used to fetch ~2 years worth of hackernews stories (uses [postgrest-go](https://github.com/supabase/postgrest-go)) 
