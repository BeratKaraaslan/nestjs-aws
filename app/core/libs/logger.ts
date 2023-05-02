export class EventLogger {
	public logs: any[] = [];
	constructor(
		private label: string,
		private labelValue: string,
		private event: any,
	) {}

	/**
	 * Log ekleme yapar. Veritabanına eklenmez.
	 */
	addLog(logType: string, logObject: any) {
		console.warn(`=> ${logType} `);
		if (logObject) {
			this.logs.push({ type: logType, data: logObject });
			return true;
		}
		return false;
	}

	setLabelValue(labelValue: string) {
		this.labelValue = labelValue;
	}

	/**
	 * Log nesnesini siler
	 */
	clearLog() {
		this.logs = [];
	}

	getLogs() {
		return this.logs;
	}

	async push() {
		// this.event.emit('log.add', this.label, this.logs, this.labelValue);
	}
}
