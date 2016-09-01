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

## Projects
{% assign projects = site.data.projects %}

{% for project in projects.company %}

{% if project.important %}
### {{ project.name }} 
{% if project.link %} __Link:__ <{{ project.link }}>{:target="_blank"} {% endif %}

__Company:__ {{ project.company }}

__Time:__ {{ project.time }}

__Team size:__ {{ project.team }}

__Position:__ {{ project.role }}

__Technologies:__ {{ project.tech }}

__Description:__ 
{% for description in project.description %}
- {{ description }}{% endfor %}
{% endif %}

{% endfor %}

{% for project in projects.pet %}

{% if project.important %}
### {{ project.name }} [[pet project]]({{project.source}}){:target="_blank"}

{% if project.link %} __Link:__ <{{ project.link }}>{:target="_blank"} {% endif %}

{% if project.source %} __Source code:__ <{{ project.source }}>{:target="_blank"} {% endif %}

__Time:__ {{ project.time }}

__Technologies:__ {{ project.tech }}

__Description:__ 
{% for description in project.description %}
- {{ description }}{% endfor %}
{% endif %}

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
|||
|---:|:---|
|__{{ detail.school }}:__| {{ detail.degree }}|
|						| {{ detail.time }}  |{% endfor %}

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
