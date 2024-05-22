function skillsMember() {
  // get all the skills
  const skills = document.querySelectorAll('.skills');
  // loop through the skills
  skills.forEach((skill) => {
    // get the skill name
    const skillName = skill.querySelector('.skill-name');
    // get the skill percentage
    const skillPercentage = skill.querySelector('.skill-percentage');
    // get the skill bar
    const skillBar = skill.querySelector('.skill-bar');
    // get the skill percentage value
    const percentageValue = skillPercentage.textContent;
    // set the skill bar width
    skillBar.style.width = percentageValue;
    // set the skill percentage text
    skillPercentage.textContent = `${percentageValue}`;
  });
}