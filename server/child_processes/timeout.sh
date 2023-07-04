#!/usr/bin/env bash
const { exec } = require("child_process")

timeout_period=10
min_brightness=15

for line in $(lsinput); do
    if [[ $line == *"/dev/input"* ]]; then
            word=$(echo $line | tr "/" "\n")
            for dev in $word; do
                    if [[ $dev == "event"* ]] ; then
                            break
                    fi
            done
    fi
    if [[ $line == *"FT5406"* ]] ; then
            break
    fi
done

nice -n 19 /etc/timeout $timeout_period $min_brightness $dev &
