---
layout: cv
title: "CV of Trung Ho (leetrunghoo)"
---
# CURRICULUM VITAE

{% assign cv = site.data.cv %}
## Basic Infomation
{% assign basic = cv.basic %}
- Name: __{{ basic.name }}__
- Date of birth: {{ basic.dob }}
- Phone: {{ basic.phone }}
- Address: {{ basic.address }}
- Email: {{ basic.email }}
- Website: {{ basic.website }}

## Objective
{{cv.objective}}

## Working Experience

{% for work in cv.works %}

### __{{ work.time }}:__ {{ work.company }}

__Position:__ {{ work.position }}

__Responsibility:__ 
{% for description in work.description %}
- {{ description }}{% endfor %}

{% endfor %}

## Skills and Techniques

{% for skill in cv.skills %}
### {{ skill.type }}
{{ skill.description }}
{% for detail in skill.details %}
- __{{ detail.name }}:__ {{ detail.description }}{% endfor %}
{% endfor %}

## Education

{% for detail in cv.education %}
|__{{ detail.time }}:__| {{ detail.school }}|
|| {{ detail.degree }}|{% endfor %}

## Interests

{% for hobby in cv.hobbies %}
- {{ hobby }}{% endfor %}

## References

{% for person in cv.references %}
__{{person.name}}__
: Position: {{person.position}}
: Phone: {{person.phone}}
: Email: {{person.email}}
{% endfor %}

