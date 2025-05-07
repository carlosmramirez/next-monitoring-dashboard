import common from "../copyText";

const copyText = {
  ...common,
  alertDialogueCancelButtonLabel: "Cancel",
  alertDialogueCloseButtonLabel: "Close",
  alertDialogueDeleteTitle: "Confirm Deletion",
  alertDialogueDeleteIssueDescription:
    "Are you sure you want to delete this issue? This action cannot be undone.",
  alertDialogueDeleteErrorTitle: "Error Deleting Issue",
  alertDialogueDeleteErrorDescription:
    "There was an error deleting the issue. Please try again later.",
  createNewIssueFormTitle: "Create New Issue",
  createNewIssueFormErrorMessage:
    "An unexpected error occured, please try again...",
  deleteIssueButtonLabel: "Delete Issue",
  editIssueButtonLabel: "Edit Issue",
  editIssueFormTitle: "Edit Issue",
  issueStatusFilterLabelAll: "All",
  issueStatusFilterLabelClosed: "Closed",
  issueStatusFilterLabelInProgress: "In Progress",
  issueStatusFilterLabelOpen: "Open",
  issueStatusFilterPlaceholder: "Filter by status...",
  issueTableColumnHeader_createdAt: "Created At",
  issueTableColumnHeader_issue: "Issue",
  issueTableColumnHeader_status: "Status",
  issueTableColumnHeader_updatedAt: "Updated At",
  placeholder_description: "Description",
  placeholder_title: "Title...",
  selectAssigneeErrorMessage:
    "There was an error assigning the user. Please try again later",
  selectAssigneeLabel: "Suggested Users",
  selectAssigneeNoUsers: "No users...",
  selectAssigneePlaceHolder: "Select Assignee...",
  selectAssigneeUnassigned: "Unassigned",
};

export default copyText;
