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

    this.subscriptions.add(
      atom.commands.add('atom-text-editor', {
        'worklog:toggle': () => this.toggle(),
        'worklog:insert-date': () => this.insertDateTime(),
      })
    );
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

  insertDateTime() {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor()) {
      const dateStr = new Date().toLocaleString();
      editor.insertText(dateStr.substring(0, dateStr.length - 3));
    }
  },


  toggle() {
    console.log('Worklog was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
