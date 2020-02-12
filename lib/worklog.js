'use babel';

import WorklogView from './worklog-view';
import { CompositeDisposable } from 'atom';

export default {

  worklogView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.worklogView = new WorklogView(state.worklogViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.worklogView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    atom.commands.add('atom-text-editor', {
      'user:insert-date': function (event) {
        const editor = this.getModel();
        return editor.insertText(new Date().toLocaleString());
      }
    });
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.worklogView.destroy();
  },

  serialize() {
    return {
      worklogViewState: this.worklogView.serialize()
    };
  },

  // toggle() {
  //   console.log('Worklog was toggled!');
  //   return (
  //     this.modalPanel.isVisible() ?
  //     this.modalPanel.hide() :
  //     this.modalPanel.show()
  //   );
  // }

};
