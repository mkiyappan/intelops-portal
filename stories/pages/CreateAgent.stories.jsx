
import React from 'react';

import CreateAgentForm from "../../components/Experiment/agentForm";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Page/CreateAgentForm',
  component: CreateAgentForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CreateAgentForm {...args} />;

export const Agent = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Agent.args = {
    id: '',
    title: 'Test',
    content: '<div>Create agent</div>',
    handleSubmitAgent:()=> {},
    agentError:"test error"
};
 