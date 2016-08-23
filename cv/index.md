---
layout: portfolio
title: "Portfolio of Trung Ho (leetrunghoo)"
---

{% assign cv = site.data.cv %}
## Basic Infomation
{% assign basic = cv.basic %}
- Name: {{ basic.name }}
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

__Job title:__ {{ work.position }}

__Responsibility:__ 
{% for description in work.description %}
- {{ description }}{% endfor %}

{% endfor %}

## Skills and Techniques

### Languages skills
{% for lang in cv.language_skills %}
- __{{ lang.name }}:__ {{ lang.description }}{% endfor %}

### Computer skills
{% for skill in cv.computer_skills %}
- __{{ skill.name }}:__ {{ skill.description }}{% endfor %}

### Communication skills
The experience at work as well as joining outdoor activities has improved my ability to communicate effectively with everyone. It also taught me the importance of listening, supporting and respecting the others.

### Teamwork skills
The experience in working in a team helps me a lot to become a good team member. I am willing to share the information, trust and support other colleagues.

### Problem solving skills
As a software developer, I am used to face many problems. I had to handle not only bugs, but also critical problems like changing requirements. To handle them, firstly I identify the cause, then identify possible solutions, after that select the best solution. 

## Interests

Playing the guitar, listening to music, singing.

Surfing the web, interested in new technologies, cell phone.

Joining English speaking club and outdoor activities.

## Refferences

Mr. Le Quang Tri

Position    : Project Director in Fisoft.

Office Add  : 169B Thich Quang Duc, Phu Nhuan Dist, HCM City.

Mobile No   : 0903935802

Email       : trilq@fisoft.com.vn

