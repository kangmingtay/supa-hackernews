# supa-hackernews

## Description
A mobile app for hackernews built with supabase

![Demo](client/assets/supa-hackernews-demo.MP4)

## Implementation
* `client` contains react native code 

* `sql` contains sql functions run on supabase to get best & new stories every hour

* `scraper` contains go code used to fetch ~2 years worth of hackernews stories (uses [postgrest-go](https://github.com/supabase/postgrest-go)) 
