#!/usr/bin/env python3

import datetime
from convertdate import hebrew, islamic

def check_lucky_day(year, month, day):
    h_year, h_month, h_day = hebrew.from_gregorian(year, month, day)
    i_year, i_month, i_day = islamic.from_gregorian(year, month, day)

    jewish_lucky_days = [(15, 1), (1, 7), (10, 7)]  # Passover, Rosh Hashanah, Yom Kippur
    islamic_lucky_days = [(12, 3), (27, 7), (10, 12)]  # Mawlid, Isra and Mi'raj, Eid al-Adha

    is_jewish_lucky = (h_day, h_month) in jewish_lucky_days
    is_islamic_lucky = (i_day, i_month) in islamic_lucky_days

    if is_jewish_lucky and is_islamic_lucky:
        return "JI"
    elif is_jewish_lucky:
        return "J"
    elif is_islamic_lucky:
        return "I"
    else:
        return "-"

today = datetime.date.today()
result = check_lucky_day(today.year, today.month, today.day)
print(result)
