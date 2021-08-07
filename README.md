# supa-hackernews

## Description
A mobile app for hackernews built with react-native, supabase & postgres functions

https://user-images.githubusercontent.com/28647601/128597094-eb8c9425-d9e7-47ec-92df-cd902ee48fc2.MP4

## Implementation
* `client` contains react native code 

* `sql` contains sql functions run on supabase to get best & new stories every hour

* `scraper` contains go code used to fetch ~2 years worth of hackernews stories (uses [postgrest-go](https://github.com/supabase/postgrest-go)) 
